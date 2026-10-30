import cv2
import numpy as np

def generate_mock_kidney_ct():
    # Create a 512x512 grayscale image representing a CT scan slice
    img = np.zeros((512, 512, 3), dtype=np.uint8)
    
    # 1. Draw the body outline (abdomen cross-section) - large dark gray ellipse
    cv2.ellipse(img, (256, 256), (180, 140), 0, 0, 360, (40, 40, 40), -1)
    
    # Add a spine structure at the back (bottom of CT slice)
    cv2.circle(img, (256, 360), 25, (180, 180, 180), -1)
    cv2.circle(img, (256, 360), 12, (220, 220, 220), -1)
    # Vertebral arches
    cv2.ellipse(img, (256, 360), (35, 15), 0, 30, 150, (150, 150, 150), 3)
    
    # Draw ribs around the edge (bone is bright white/gray in CT)
    for angle in range(30, 150, 20):
        # Left side ribs
        x1 = int(256 - 175 * np.cos(np.radians(angle)))
        y1 = int(256 + 135 * np.sin(np.radians(angle)))
        cv2.circle(img, (x1, y1), 8, (220, 220, 220), -1)
        # Right side ribs
        x2 = int(256 + 175 * np.cos(np.radians(angle)))
        y2 = int(256 + 135 * np.sin(np.radians(angle)))
        cv2.circle(img, (x2, y2), 8, (220, 220, 220), -1)

    # 2. Draw Left Kidney (Right side of CT scan) - bean shape
    # We can create a mask for a bean shape
    left_kidney_mask = np.zeros((512, 512), dtype=np.uint8)
    cv2.ellipse(left_kidney_mask, (150, 250), (45, 75), -20, 0, 360, 255, -1)
    # Subtract inner ellipse to make it kidney-bean-shaped
    cv2.ellipse(left_kidney_mask, (115, 250), (25, 45), -20, 0, 360, 0, -1)
    
    # Fill the left kidney with standard tissue density (gray)
    img[left_kidney_mask == 255] = [80, 80, 80]
    
    # 3. Draw Right Kidney (Left side of CT scan) - bean shape
    right_kidney_mask = np.zeros((512, 512), dtype=np.uint8)
    cv2.ellipse(right_kidney_mask, (362, 250), (45, 75), 20, 0, 360, 255, -1)
    cv2.ellipse(right_kidney_mask, (397, 250), (25, 45), 20, 0, 360, 0, -1)
    
    img[right_kidney_mask == 255] = [80, 80, 80]

    # 4. Add Pathologies for testing
    # Let's add a Cyst in the Left Kidney (fluid-filled, dark circle)
    cv2.circle(img, (155, 230), 12, (30, 30, 30), -1) # Cyst
    
    # Let's add a Tumor in the Right Kidney (neoplasm, irregular gray/white mass)
    tumor_pts = np.array([[340, 240], [365, 220], [380, 250], [355, 275], [335, 260]], dtype=np.int32)
    cv2.fillPoly(img, [tumor_pts], (120, 120, 120)) # Tumor mass
    
    # Let's add a Stone in the Right Kidney (calcification, bright white small circle)
    cv2.circle(img, (350, 285), 6, (255, 255, 255), -1) # Stone

    # Apply a light bilateral filter or gaussian blur to simulate CT scan noise
    img = cv2.GaussianBlur(img, (3, 3), 0)
    # Add subtle Gaussian noise
    noise = np.random.normal(0, 3, img.shape).astype(np.int32)
    img = np.clip(img.astype(np.int32) + noise, 0, 255).astype(np.uint8)

    # Save image
    output_path = 'mock_kidney_ct.png'
    cv2.imwrite(output_path, img)
    print(f"Generated mock kidney CT scan at: {output_path}")

if __name__ == '__main__':
    generate_mock_kidney_ct()
