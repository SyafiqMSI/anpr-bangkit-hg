from flask import Flask, request, render_template, jsonify, send_file
import cv2
import random
import numpy as np
from pathlib import Path
from ultralytics import YOLO
import easyocr
import re
from difflib import get_close_matches
from matplotlib import pyplot as plt
import time
from flask_cors import CORS
import logging
import traceback
import os
from google.cloud import storage
from datetime import datetime


app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

UPLOAD_FOLDER = Path('./uploads')
OUTPUT_FOLDER = Path('./output')
UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

def region(file_path):
    region_codes = {}
    with open(file_path, 'r') as file:
        for line in file:
            if line.strip():  
                code, region = line.strip().split(': ')
                region_codes[code] = region
    return region_codes

REGION_CODES = region('region.txt')

print(REGION_CODES)

def model():
    model_vehicle = YOLO('model/yolo11n.pt')
    model_plate = YOLO('model/best.pt')
    reader = easyocr.Reader(['en'], gpu=True)
    return model_vehicle, model_plate, reader

def format_plate_number(text):
    print(f"Formatting plate number: {text}")
    
    text = re.sub(r'[^A-Z0-9]', '', text.upper())
    
    char_substitutions = {
        'O': '0', '0': 'O',
        'I': '1', '1': 'I',
        'Z': '2', '2': 'Z',
        'J': '3', '3': 'J',
        'A': '4', '4': 'A',
        'S': '5', '5': 'S',
        'G': '6', '6': 'G',
        'T': '7', '7': 'T',
        'B': '8', '8': 'B',
    }
    
    def validate_section(text_part, expected_type='alpha'):
        result = ''
        for char in text_part:
            if expected_type == 'alpha' and char.isdigit():
                if char in char_substitutions:
                    result += char_substitutions[char]
                else:
                    result += char
            elif expected_type == 'num' and not char.isdigit():
                if char in char_substitutions:
                    result += char_substitutions[char]
                else:
                    result += char
            else:
                result += char
        return result
    
    number_match = re.search(r'[0-9]{1,4}', text)
    if number_match:
        number_start = number_match.start()
        number_end = number_match.end()
        
        prefix = text[:number_start]
        numbers = text[number_start:number_end]
        suffix = text[number_end:]
        
        prefix = validate_section(prefix, 'alpha')
        numbers = validate_section(numbers, 'num')
        suffix = validate_section(suffix, 'alpha')
        
        if len(prefix) <= 2 and len(numbers) <= 4 and len(suffix) <= 3:
            region_check = get_closest_region_code(prefix)
            if region_check:
                formatted_plate = f"{region_check} {numbers} {suffix}"
                print(f"Formatted plate number: {formatted_plate}")
                return formatted_plate
    
    parts = re.findall(r'[A-Z]+|[0-9]+', text)
    if len(parts) >= 3:
        prefix = validate_section(parts[0], 'alpha')
        numbers = validate_section(parts[1], 'num')
        suffix = validate_section(''.join(parts[2:]), 'alpha')
        
        if len(prefix) <= 2 and len(numbers) <= 4 and len(suffix) <= 3:
            region_check = get_closest_region_code(prefix)
            if region_check:
                formatted_plate = f"{region_check} {numbers} {suffix}"
                print(f"Formatted plate number: {formatted_plate}")
                return formatted_plate
    
    print("No valid Indonesian plate format found")
    return None

def get_closest_region_code(code):
    print(f"Getting closest region code for '{code}'")
    if code in REGION_CODES:
        print(f"Exact match found: {code}")
        return code
    matches = get_close_matches(code, REGION_CODES.keys(), n=1, cutoff=0.6)
    closest_match = matches[0] if matches else None
    if closest_match:
        print(f"Closest match found: {closest_match}")
    else:
        print("No close match found.")
    return closest_match

def edge_detection(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 50, 150)
    return edges

def detect_plates(model_plate, image):
    print("Detecting plates in the image.")
    results = model_plate(image)
    plate_detections = []
    
    for box in results[0].boxes:
        x, y, w, h = box.xywh[0]
        conf = box.conf[0]
        margin = 0.0
        
        x1 = max(0, int(x - w / 2 - margin * w))
        y1 = max(0, int(y - h / 2 - margin * h))
        x2 = min(image.shape[1], int(x + w / 2 + margin * w))
        y2 = min(image.shape[0], int(y + h / 2 + margin * h))
        
        plate_detections.append({
            'bbox': (x1, y1, x2, y2),
            'conf': conf,
            'center': (int(x), int(y)),
            'size': (int(w), int(h))
        })
    
    print(f"Detected {len(plate_detections)} plates.")
    return plate_detections

def enhance_plate_image(plate_img):
    gray = cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY)
    
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    gray = clahe.apply(gray)
    
    denoised = cv2.fastNlMeansDenoising(gray)
    
    binary = cv2.adaptiveThreshold(denoised, 255, 
                                 cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                 cv2.THRESH_BINARY_INV, 11, 2)
    
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (2,2))
    binary = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
    binary = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
    
    return binary

def process_image(model_vehicle, model_plate, reader, image_path):
    print(f"Processing image: {image_path}")
    logger.info("Reading image")
    img = cv2.imread(str(image_path))
    if img is None:
        logger.error("Could not read image")
        raise ValueError(f"Could not read image: {image_path}")
    
    logger.info("Processing image")
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result_img = img_rgb.copy()

    logger.info("Detecting vehicles")
    vehicles = model_vehicle(img)
    for box in vehicles[0].boxes:
        x, y, w, h = box.xywh[0]
        conf = box.conf[0]
        x1 = max(0, int(x - w / 2))
        y1 = max(0, int(y - h / 2))
        x2 = min(img.shape[1], int(x + w / 2))
        y2 = min(img.shape[0], int(y + h / 2))

        cv2.rectangle(result_img, (x1, y1), (x2, y2), (0, 0, 255), 2)
        label = f"Vehicle {conf:.2f}"
        cv2.putText(result_img, label, (x1, max(y1 - 10, 20)),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    logger.info("Detecting plates")
    plates = detect_plates(model_plate, img)
    plate_texts = []

    for plate in plates:
        x1, y1, x2, y2 = plate['bbox']
        
        if x2 > x1 and y2 > y1:
            plate_crop = img[y1:y2, x1:x2]
            if plate_crop.size > 0:
                plate_text = read_plate(reader, plate_crop)
                
                if plate_text == "Tidak Terbaca":
                    region_name = "Unknown"
                else:
                    region_code = plate_text.split()[0]
                    region_name = REGION_CODES.get(region_code, "Unknown")

                plate_texts.append({
                    'text': plate_text,
                    'conf': plate['conf'],
                    'region': region_name
                })

                cv2.rectangle(result_img, (x1, y1), (x2, y2), (0, 255, 0), 2)

                label = f"{plate_text} - {region_name}" if plate_text != "Tidak Terbaca" else "Tidak Terbaca"
                cv2.putText(result_img, label, (x1, max(y1 - 10, 20)),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    return result_img, plate_texts

def read_plate(reader, plate_img):
    print("Reading plate text using OCR.")
    
    rows, cols = plate_img.shape[:2]
    if rows > cols:
        plate_img = cv2.rotate(plate_img, cv2.ROTATE_90_CLOCKWISE)
    
    attempts = [
        plate_img,  
        enhance_plate_image(plate_img),  
        cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY),  
        cv2.threshold(cv2.cvtColor(plate_img, cv2.COLOR_BGR2GRAY), 
                     0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1],  
    ]
    
    all_texts = []
    
    for img in attempts:
        results = reader.readtext(img, allowlist='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        
        if results:
            for (bbox, text, conf) in results:
                all_texts.append((text, conf))
            
            if len(results) > 1:
                results.sort(key=lambda x: x[0][0][0])  
                combined_text = ''.join(r[1] for r in results)
                avg_conf = sum(r[2] for r in results) / len(results)
                all_texts.append((combined_text, avg_conf))
    
    all_texts.sort(key=lambda x: x[1], reverse=True)
    
    for text, conf in all_texts:
        formatted = format_plate_number(text)
        if formatted:
            print(f"Successfully detected plate: {formatted}")
            return formatted
    
    print("No valid plate text detected")
    return "Tidak Terbaca"

ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Google Cloud Storage Setup
GCS_BUCKET_NAME = 'apnr-output-bucket'  # Replace with your GCS bucket name
storage_client = storage.Client()

# Create a GCS bucket reference
bucket = storage_client.get_bucket(GCS_BUCKET_NAME)

# Setup logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Initialize directories for local processing (optional if you still need local files for logging/temporary steps)
UPLOAD_FOLDER = Path('./uploads')
OUTPUT_FOLDER = Path('./output')
UPLOAD_FOLDER.mkdir(exist_ok=True)
OUTPUT_FOLDER.mkdir(exist_ok=True)

# Helper function to upload files to Google Cloud Storage
def upload_to_gcs(local_file_path, destination_blob_name):
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_file_path)
    logger.info(f"File uploaded to GCS as {destination_blob_name}")
    return f"https://storage.googleapis.com/{GCS_BUCKET_NAME}/{destination_blob_name}"

# Helper function to download files from GCS (for processed results)
def download_from_gcs(source_blob_name, local_file_path):
    blob = bucket.blob(source_blob_name)
    blob.download_to_filename(local_file_path)
    logger.info(f"File downloaded from GCS to {local_file_path}")

# Function to process uploaded images
def process_uploaded_image(image_file):
    timestamp = str(int(time.time()))
    file_extension = image_file.filename.split('.')[-1]
    file_name = f"{timestamp}.{file_extension}"
    
    # Save the uploaded file locally
    local_path = UPLOAD_FOLDER / file_name
    image_file.save(local_path)

    # Upload the file to Google Cloud Storage
    gcs_image_path = upload_to_gcs(local_path, f"uploads/{file_name}")

    # Load models
    model_vehicle, model_plate, reader = model()

    try:
        result_img, plate_texts = process_image(model_vehicle, model_plate, reader, local_path)

        # Save processed image locally for GCS upload
        processed_image_local_path = OUTPUT_FOLDER / f"processed_{file_name}"
        plt.imsave(str(processed_image_local_path), result_img)

        # Upload processed image to Google Cloud Storage
        gcs_processed_image_path = upload_to_gcs(processed_image_local_path, f"processed/{file_name}")
        
        response = {
            "detected_plates": [plate['text'] for plate in plate_texts],
            "processed_image": gcs_processed_image_path,  # URL of processed image in GCS
            "conf": [plate['conf'].item() for plate in plate_texts],
            "region": [plate['region'] for plate in plate_texts],
        }

        logger.info(f"Processing completed, returning response: {response}")
        return jsonify(response)

    except Exception as e:
        logger.error(f"Error processing image {file_name}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/process-image', methods=['POST'])
def upload_file():
    try:
        logger.info("Received image processing request")

        if 'image' not in request.files:
            logger.error("No file part in request")
            return jsonify({"error": "No file uploaded"}), 400

        uploaded_file = request.files['image']
        if uploaded_file.filename == '':
            logger.error("No selected file")
            return jsonify({"error": "No selected file"}), 400
        
        return process_uploaded_image(uploaded_file)

    except Exception as e:
        logger.error(f"Error during file upload: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/output/<filename>')
def output_file(filename):
    try:
        # Download the file from GCS and send it as a response
        local_path = OUTPUT_FOLDER / filename
        download_from_gcs(f"processed/{filename}", local_path)
        
        return send_file(local_path, mimetype='image/jpeg', as_attachment=False)

    except Exception as e:
        logger.error(f"Error serving file: {str(e)}")
        return jsonify({"error": str(e)}), 404
    
@app.route('/')
def index():
    return render_template('index.html')  # Make sure your HTML file is in the templates folder


if __name__ == '__main__':
    app.run(debug=True)