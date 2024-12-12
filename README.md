# Automatic Number Plate Recognition (ANPR)
This project implements an **Automatic Number Plate Recognition (ANPR)** system that detects and processes vehicle number plates from images and videos. The system is deployed on the cloud, providing an efficient solution for vehicle tracking, security, and management purposes.

## ⚡Overview
The project leverages machine learning for number plate recognition, deploying the model on the cloud using various technologies such as **Google Cloud Virtual Machine**, **Google Cloud Bucket**, **Google Cloud App Engine**, **Google Cloud Run**, and **Firebase** for scalability and performance. Users can upload images or videos, and the system will detect the license plates and return processed results with the confidence score and regions of detected plates.

## 🚀 Features

- **File Upload**: Supports both image and video uploads.
- **Plate Detection**: Detects and recognizes license plates from the uploaded media.
- **Cloud Deployment**: Deployed to the cloud for scalability and accessibility.
- **User Authentication**: Allows users to log in and manage their upload history.
- **Progress Feedback**: Displays processing progress for uploaded media.
- **Processed Results**: Displays detected plates, confidence levels, and regions of detection.
- **Link Sharing**: Allows users to share results via a link.

## 📕 Tech Stack

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

