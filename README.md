# User Management

## Description

This is the assignment for Xcelore MERN stack Fresher. Completed by Abhishek Rajbhar.

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have Node.js and npm installed on your local development machine.

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (v6 or later)

### Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/abhishekdev45/user-management.git
```

### Backend Setup

- Navigate to the backend directory of the project:
  
  ```bash
   cd backend
  ```
- Create a .env file in the backend directory and add the following environment variables:
    ```bash
    MONGO_URI=YOUR_MONGO_URI
    JWT_SECRET=YOUR_SECRET
  ```
  Replace YOUR_MONGO_URI with your MongoDB connection string and YOUR_SECRET with a secret key for JWT token.

- Install backend dependencies:
   ```bash
     npm install
   ```
- Start the backend server:
   ```bash
     npm start
   ```
   The backend server will start running on port 5000 by default.

### Frontend Setup
- Navigate back to the project root directory:
  ```bash
     cd ..
   ```
- Navigate to the frontend directory:
   ```bash
     cd frontend
   ```
- Install frontend dependencies:
    ```bash
    npm install
   ```
- Start the frontend development server:
   ```bash
    npm start
   ```
   The frontend server will start running on port 3000 by default and open the project in your default web browser.

###Accessing the Application

- You can now access the application by visiting http://localhost:3000 in your web browser.
- By Default Login page will open.
- Click on Register to register new user.
- Change registered user role to Admin from your mongodb ui.Use this id to see admin features.
  
  

### Additional Notes
- Ensure your MongoDB server is running and accessible with the provided MONGO_URI.
- Modify the .env file as needed for different environments (development, production, etc.).
- Backend APIs will be accessible via endpoints like http://localhost:5000/api/...


