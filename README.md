# Automatic Number Plate Recognition (ANPR)

This project implements an **Automatic Number Plate Recognition (ANPR)** system that detects and processes vehicle number plates from images and videos. The system is deployed on the cloud, providing an efficient solution for vehicle tracking, security, and management purposes.

## Overview
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="none" viewBox="0 0 256 256"><rect width="256" height="256" fill="#242938" rx="60"/><path fill="#EA4335" d="M161.009 92.3895L178.394 75.0043L179.553 67.684C147.873 38.877 97.5124 42.1434 68.9538 74.4997C61.021 83.4864 55.1358 94.6903 51.9976 106.26L58.2241 105.382L92.9937 99.6489L95.678 96.9036C111.144 79.9176 137.295 77.6325 155.153 92.0848L161.009 92.3895Z"/><path fill="#4285F4" d="M203.16 105.749C199.164 91.033 190.96 77.8041 179.553 67.6846L155.153 92.0846C165.456 100.503 171.326 113.186 171.074 126.489V130.82C183.067 130.82 192.79 140.542 192.79 152.535C192.79 164.529 183.067 174.008 171.074 174.008H127.581L123.311 178.644V204.691L127.581 208.778H171.074C202.269 209.021 227.755 184.173 227.998 152.978C228.145 134.069 218.823 116.342 203.16 105.749Z"/><path fill="#34A853" d="M84.1488 208.778H127.581V174.008H84.1488C81.0543 174.007 78.0574 173.342 75.2433 172.056L69.0816 173.947L51.5746 191.332L50.0496 197.249C59.8675 204.662 71.8464 208.831 84.1488 208.778Z"/><path fill="#FBBC05" d="M84.1487 95.9886C52.9526 96.1746 27.8151 121.615 28.001 152.811C28.1049 170.231 36.2409 186.629 50.0495 197.249L75.2432 172.056C64.3128 167.118 59.4557 154.254 64.394 143.325C69.3315 132.395 82.1956 127.538 93.1245 132.475C97.9409 134.651 101.798 138.509 103.974 143.325L129.167 118.132C118.448 104.118 101.792 95.9254 84.1487 95.9886Z"/></svg>
The project leverages machine learning for number plate recognition, deploying the model on the cloud using various technologies such as **Google Cloud Virtual Machine**, **Google Cloud Bucket**, **Google Cloud App Engine**, **Google Cloud Run**, and **Firebase** for scalability and performance. Users can upload images or videos, and the system will detect the license plates and return processed results with the confidence score and regions of detected plates.

## 🚀 Features

- **File Upload**: Supports both image and video uploads.
- **Plate Detection**: Detects and recognizes license plates from the uploaded media.
- **Cloud Deployment**: Deployed to the cloud for scalability and accessibility.
- **User Authentication**: Allows users to log in and manage their upload history.
- **Progress Feedback**: Displays processing progress for uploaded media.
- **Processed Results**: Displays detected plates, confidence levels, and regions of detection.
- **Link Sharing**: Allows users to share results via a link.

## Tech Stack

- **Frontend**:
  - React (Next.js)
  - shadcn/ui (Styling)
  - Tailwind CSS for styling
  - Firebase for authentication
  - Lucide Icons for UI components
  - Google App Engine for deployment
  
- **Backend**:
  - Python (REST API)
  - OpenCV and custom ML model for plate recognition
  - Google Cloud Virtual Machine for server hosting
  - Docker for containerization for Cloud Run backup server

- **Authentication**:
  - Firebase Authentication for user login

## ⚙️ Setup Instriction

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js 22.12.0 (LTS)+** (for frontend)
- **Docker** (for containerization)
- **Python 3.11+** (for backend processing)
- **Firebase Project** (for Firebase Authentication)

### 1. Clone the Repository
```bash
git clone https://github.com/APNR-C242-AP01/cloud-computing.git
```

### 2. Install Frontend Dependencies
Ensure you have NodeJs 22.12.0 (LTS)+ installed. Install required libraries:
```bash
npm install
```

### 3. Install Backend Dependencies
Ensure you have Python 3.11+ installed. Install required libraries:
```
cloud-computing/
├── src/
│   └── app/
        └── python
```
```bash
pip install -r requirements.txt
```

### 4. Run the Backend Application
Start the Flask server:
```
cloud-computing/
├── src/
│   └── app
        └── python
```
```bash
python app-staging.py
```
The server will start on `http://127.0.0.1:5000`.

### 5. Run the Frontend Next.js
Start the npm server:
```bash
npm run dev
```
The server will start on `http://localhost:3000`

