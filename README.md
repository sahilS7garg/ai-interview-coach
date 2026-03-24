# AI Interview Coach

AI-powered coding interview preparation platform that recommends coding problems based on user performance and predicts difficulty using machine learning.

---

## 🚀 Features

* Personalized coding problem recommendations
* Machine Learning based difficulty prediction
* Practice coding problems
* Progress tracking dashboard
* Topic mastery analysis

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TailwindCSS

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

### Machine Learning Service

* Python
* FastAPI
* Scikit-learn
* TF-IDF Vectorizer

---

## 📂 Project Structure

ai-interview-coach

backend → Node.js API
frontend → Next.js UI
ml-service → Python ML model

---

## ⚙️ Run Locally

### Backend

npm install
npm start

### Frontend

npm install
npm run dev

### ML Service

pip install -r requirements.txt
python main.py

---

## 🧠 ML Model

The ML service predicts coding problem difficulty using:

* TF-IDF Vectorization
* Logistic Regression classifier
* Trained using coding problem dataset

---

## 🎯 Future Improvements

* AI interview feedback
* Code execution engine
* ChatGPT style coding assistant
* Company-wise problem sets
---

## 🚀 Endee Vector Database Integration

This project explores the use of Endee, a high-performance vector database, for improving recommendation systems.

🔗 Endee Repository: https://github.com/endee-io/endee

### How Endee can be used in this project:

- Store vector embeddings of coding problems
- Perform similarity search for better problem recommendations
- Enhance personalization using vector-based matching

### Example Use Case:

The ML service can generate embeddings of problem descriptions using TF-IDF or advanced models, and Endee can be used to efficiently retrieve similar problems based on user performance.

This improves the accuracy and scalability of the recommendation system.
