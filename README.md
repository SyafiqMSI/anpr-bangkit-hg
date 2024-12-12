# Automatic Number Plate Recognition (ANPR)

This project implements an **Automatic Number Plate Recognition (ANPR)** system that detects and processes vehicle number plates from images and videos. The system is deployed on the cloud, providing an efficient solution for vehicle tracking, security, and management purposes.

## Overview

The project leverages machine learning for number plate recognition, deploying the model on the cloud using various technologies such as **Google Cloud Virtual Machine**, **Google Cloud Bucket**, **Google Cloud App Engine**, **Google Cloud Run**, and **Firebase** for scalability and performance. Users can upload images or videos, and the system will detect the license plates and return processed results with the confidence score and regions of detected plates.

## Features

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
  - Tailwind CSS for styling
  - Firebase for authentication
  - Lucide Icons for UI components
  - Google App Engine for deployment
  
- **Backend**:
  - Python (Flask or FastAPI)
  - OpenCV and custom ML model for plate recognition
  - Docker for containerization
  - Google Cloud Virtual Machine for server hosting

- **Authentication**:
  - Firebase Authentication for user login
  - 
## Getting Started

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (version >= 16.0.0)
- **Docker** (for containerization)
- **Python 3.11** (for backend processing)
- **Firebase Project** (for Firebase Authentication)
