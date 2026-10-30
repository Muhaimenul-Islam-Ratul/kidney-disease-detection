import os
import sys
import importlib.machinery
from types import ModuleType

# Setup robust mock tensorflow to bypass Keras 3.x TF graph check bugs
mock_tf = ModuleType("tensorflow")
mock_tf.executing_eagerly = lambda: True
mock_tf.__spec__ = importlib.machinery.ModuleSpec(name="tensorflow", loader=None)
sys.modules["tensorflow"] = mock_tf

import io
import base64
import numpy as np
import cv2
from PIL import Image

# Force Keras to use PyTorch backend before importing Keras
os.environ["KERAS_BACKEND"] = "torch"
import keras
import torch
import segmentation_models_pytorch as smp
from ultralytics import YOLO

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='../Fontend', static_url_path='')
CORS(app)

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f"Using device: {device}")

# Paths to models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, 'Model+Extension')

CLF_MODEL_PATH = os.path.join(MODEL_DIR, 'EfficientNetV2-S.h5')
DET_MODEL_PATH = os.path.join(MODEL_DIR, 'yolo11s.pt')
SEG_MODEL_PATH = os.path.join(MODEL_DIR, 'U-Net++.pt')

# Load all required models before serving requests. Raising here makes the
# process fail startup so deployment platforms cannot route traffic to a
# partially initialized API.
print("Loading models... This may take a few seconds.")

try:
    print("Loading Classification Model...")
    clf_model = keras.models.load_model(CLF_MODEL_PATH)
    print("Classification Model loaded successfully.")

    print("Loading Detection Model...")
    det_model = YOLO(DET_MODEL_PATH)
    print("Detection Model loaded successfully.")

    print("Loading Segmentation Model...")
    # ResNet34 encoder with 4 output classes
    seg_model = smp.UnetPlusPlus(encoder_name='resnet34', encoder_weights=None, classes=4)
    seg_model.load_state_dict(torch.load(SEG_MODEL_PATH, map_location='cpu'))
    seg_model = seg_model.to(device)
    seg_model.eval()
    print("Segmentation Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Required model failed to load: {e}") from e

# Classification classes (alphabetical)
CLF_CLASSES = ['Cyst', 'Normal', 'Stone', 'Tumor']

def convert_to_base64(img_bgr):
    _, buffer = cv2.imencode('.png', img_bgr)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    return f"data:image/png;base64,{img_base64}"

@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/health/live', methods=['GET'])
def health_live():
    """Liveness probe: the process is running and can answer HTTP requests."""
    return jsonify({'status': 'alive'}), 200

@app.route('/health/ready', methods=['GET'])
def health_ready():
    """Readiness probe: all required models must be loaded before serving."""
    models = {
        'classification': clf_model is not None,
        'detection': det_model is not None,
        'segmentation': seg_model is not None,
    }
    ready = all(models.values())
    return jsonify({
        'status': 'ready' if ready else 'not_ready',
        'models': models,
    }), 200 if ready else 503

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

@app.route('/api/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file uploaded'}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        # Read image using OpenCV
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img_bgr = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
        if img_bgr is None:
            return jsonify({'error': 'Invalid image format'}), 400
        
        # Save original size for scaling back
        orig_h, orig_w = img_bgr.shape[:2]
        img_rgb = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB)
        
        results = {}

        # ----------------------------------------------------
        # 1. RUN CLASSIFICATION
        # ----------------------------------------------------
        if clf_model is not None:
            # Preprocess: resize to 224x224 and expand dimensions to (1, 224, 224, 3)
            clf_img = cv2.resize(img_rgb, (224, 224))
            clf_input = np.expand_dims(clf_img, axis=0).astype(np.float32) / 255.0
            
            # Predict
            clf_preds = clf_model(clf_input)
            
            # Convert prediction tensor to numpy array
            if hasattr(clf_preds, "cpu"):
                clf_probs = clf_preds.cpu().detach().numpy()[0]
            else:
                clf_probs = np.array(clf_preds)[0]
                
            pred_class_idx = int(np.argmax(clf_probs))
            pred_class = CLF_CLASSES[pred_class_idx]
            confidence = float(clf_probs[pred_class_idx])
            
            class_probs = {CLF_CLASSES[i]: float(clf_probs[i]) for i in range(len(CLF_CLASSES))}
            
            results['classification'] = {
                'class': pred_class,
                'confidence': confidence,
                'probabilities': class_probs
            }
        else:
            results['classification'] = {'error': 'Classification model not loaded'}

        # ----------------------------------------------------
        # 2. RUN DETECTION
        # ----------------------------------------------------
        if det_model is not None:
            # YOLO expects image directly, it handles preprocessing
            det_results = det_model(img_bgr, verbose=False)
            det_result = det_results[0]
            
            # Draw detections
            annotated_bgr = det_result.plot()
            det_img_base64 = convert_to_base64(annotated_bgr)
            
            # Extract box data
            boxes_list = []
            for box in det_result.boxes:
                coords = box.xyxy[0].tolist()  # [x1, y1, x2, y2]
                conf = float(box.conf[0])
                cls_id = int(box.cls[0])
                cls_name = det_model.names[cls_id]
                boxes_list.append({
                    'coordinates': coords,
                    'confidence': conf,
                    'class': cls_name
                })
                
            results['detection'] = {
                'image': det_img_base64,
                'boxes': boxes_list
            }
        else:
            results['detection'] = {'error': 'Detection model not loaded'}

        # ----------------------------------------------------
        # 3. RUN SEGMENTATION
        # ----------------------------------------------------
        if seg_model is not None:
            # Preprocess: resize to 256x256 and normalize
            seg_img = cv2.resize(img_rgb, (256, 256))
            seg_img_normalized = seg_img.astype(np.float32) / 255.0
            
            # Imagenet standard normalization
            mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
            std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
            seg_img_normalized = (seg_img_normalized - mean) / std
            
            # Convert to torch tensor of shape (1, 3, 256, 256)
            seg_tensor = torch.tensor(seg_img_normalized).permute(2, 0, 1).unsqueeze(0).to(device)
            
            with torch.no_grad():
                logits = seg_model(seg_tensor)
                # Argmax to get 2D mask of shape (256, 256)
                pred_mask = torch.argmax(logits, dim=1).squeeze(0).cpu().numpy()
            
            # Resize mask back to original image size using NEAREST interpolation
            resized_mask = cv2.resize(pred_mask, (orig_w, orig_h), interpolation=cv2.INTER_NEAREST)
            
            # Create color overlay on original image
            # Classes: 0: bg, 1: Cyst, 2: Stone, 3: Tumor
            # BGR Colors: Blue, Yellow, Red
            color_mask = np.zeros_like(img_bgr)
            color_mask[resized_mask == 1] = [255, 0, 0]     # Blue for Cyst (BGR)
            color_mask[resized_mask == 2] = [0, 255, 255]   # Yellow for Stone (BGR)
            color_mask[resized_mask == 3] = [0, 0, 255]     # Red for Tumor (BGR)
            
            # Create weighted overlay
            overlay_img = img_bgr.copy()
            alpha = 0.4
            cv2.addWeighted(color_mask, alpha, img_bgr, 1.0 - alpha, 0, overlay_img)
            
            # Copy overlay only where mask is not background
            seg_visualization = img_bgr.copy()
            mask_indices = resized_mask > 0
            seg_visualization[mask_indices] = overlay_img[mask_indices]
            
            # Convert to base64
            seg_img_base64 = convert_to_base64(seg_visualization)
            
            # Calculate pixel stats
            total_pixels = resized_mask.size
            cyst_pixels = int(np.sum(resized_mask == 1))
            stone_pixels = int(np.sum(resized_mask == 2))
            tumor_pixels = int(np.sum(resized_mask == 3))
            
            stats = {
                'cyst_area_pct': float(cyst_pixels / total_pixels * 100),
                'stone_area_pct': float(stone_pixels / total_pixels * 100),
                'tumor_area_pct': float(tumor_pixels / total_pixels * 100),
                'cyst_pixels': cyst_pixels,
                'stone_pixels': stone_pixels,
                'tumor_pixels': tumor_pixels
            }
            
            results['segmentation'] = {
                'image': seg_img_base64,
                'stats': stats
            }
        else:
            results['segmentation'] = {'error': 'Segmentation model not loaded'}

        return jsonify(results)

    except Exception as e:
        print(f"Error during image analysis: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Failed to process image: {str(e)}'}), 500

if __name__ == '__main__':
    # Start Flask server
    app.run(host='0.0.0.0', port=5000, debug=False)
