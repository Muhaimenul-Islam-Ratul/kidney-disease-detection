import os
import sys
import importlib.machinery
from types import ModuleType

# Setup robust mock tensorflow to bypass Keras 3.x TF graph check bugs
mock_tf = ModuleType("tensorflow")
mock_tf.executing_eagerly = lambda: True
mock_tf.__spec__ = importlib.machinery.ModuleSpec(name="tensorflow", loader=None)
sys.modules["tensorflow"] = mock_tf

import numpy as np
import cv2
import torch

os.environ["KERAS_BACKEND"] = "torch"
import keras
import segmentation_models_pytorch as smp
from ultralytics import YOLO

def test_pipeline():
    print("=== Testing Kidney Disease Model Pipeline ===")
    
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_DIR = os.path.join(BASE_DIR, 'Model+Extension')

    CLF_MODEL_PATH = os.path.join(MODEL_DIR, 'EfficientNetV2-S.h5')
    DET_MODEL_PATH = os.path.join(MODEL_DIR, 'yolo11s.pt')
    SEG_MODEL_PATH = os.path.join(MODEL_DIR, 'U-Net++.pt')

    # Create a dummy image (256x256 RGB)
    dummy_img = (np.random.rand(256, 256, 3) * 255).astype(np.uint8)
    cv2.imwrite('dummy_ct.png', dummy_img)
    print("Created dummy_ct.png for testing.")

    # 1. Classification
    print("\n1. Testing Classification Model...")
    try:
        clf_model = keras.models.load_model(CLF_MODEL_PATH)
        clf_img = cv2.resize(dummy_img, (224, 224))
        clf_input = np.expand_dims(clf_img, axis=0).astype(np.float32) / 255.0
        preds = clf_model(clf_input)
        
        if hasattr(preds, "cpu"):
            probs = preds.cpu().detach().numpy()[0]
        else:
            probs = np.array(preds)[0]
            
        print("Classification probabilities:", probs)
        print("Max index:", np.argmax(probs))
    except Exception as e:
        print("Classification failed:", e)

    # 2. Detection
    print("\n2. Testing Detection Model...")
    try:
        det_model = YOLO(DET_MODEL_PATH)
        det_results = det_model('dummy_ct.png', verbose=False)
        print("Boxes detected:", len(det_results[0].boxes))
    except Exception as e:
        print("Detection failed:", e)

    # 3. Segmentation
    print("\n3. Testing Segmentation Model...")
    try:
        seg_model = smp.UnetPlusPlus(encoder_name='resnet34', encoder_weights=None, classes=4)
        seg_model.load_state_dict(torch.load(SEG_MODEL_PATH, map_location='cpu'))
        seg_model.eval()
        
        seg_img = cv2.resize(dummy_img, (256, 256))
        seg_img_normalized = seg_img.astype(np.float32) / 255.0
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
        seg_img_normalized = (seg_img_normalized - mean) / std
        seg_tensor = torch.tensor(seg_img_normalized).permute(2, 0, 1).unsqueeze(0)
        
        with torch.no_grad():
            logits = seg_model(seg_tensor)
            pred_mask = torch.argmax(logits, dim=1).squeeze(0).cpu().numpy()
            
        print("Segmentation output shape:", logits.shape)
        print("Mask unique values:", np.unique(pred_mask))
    except Exception as e:
        print("Segmentation failed:", e)

    # Clean up dummy image
    if os.path.exists('dummy_ct.png'):
        os.remove('dummy_ct.png')
    print("\n=== Pipeline Test Finished ===")

if __name__ == '__main__':
    test_pipeline()
