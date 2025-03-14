# 🏋️‍♂️ Gym Management System

🚀 **Live Demo**: [Gym Management System](https://gym-management-system-jet.vercel.app/)  

Welcome to the **Gym Management System**, a backend application designed to manage gym classes, users (trainers and trainees), and bookings. This system allows users to register, login, view, book, and cancel gym classes, while admins can create and delete classes. The project is built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**, with strong authentication and role-based access control.

---

## 📹 **Project Data Model**  
review the full Data Model 
👉 **Model Review**: [Model](https://docs.google.com/document/d/1AWaKhkq_sEJBE-XuuGizWErECkAjoWiiVaHx7HuNL3Q/edit?usp=sharing)

---

## 📋 **Features**

### ✨ **Authentication**
- Register users with admin privileges for trainees and trainers.
- Login for all users (trainers, trainees, and admin).

### 🏋️‍♂️ **Gym Class Management**
- **Admin** can create and delete gym classes.
- **Trainer** and **All Users** can view all gym classes.
- **Trainee** can book and cancel classes based on availability.

### 🔐 **Role-based Access Control**
- Admin has privileges to manage classes.
- Trainers can only view classes and interact with bookings.
- Trainees can view and book classes and cancel their bookings.

---

## 🛠️ **Technologies Used**

- **Backend Framework**: Express.js  
- **Programming Language**: Node.js with TypeScript  
- **Database**: MongoDB with Mongoose  
- **Authentication**: JWT (JSON Web Token) for secure authentication  
- **Deployment**: Vercel (for frontend)  

---

## 📂 **Folder Structure**

```plaintext
Gym-Management-System/
│
├── dist/                # Compiled JavaScript files
├── node_modules/        # Node.js dependencies
├── src/                 # Source code
│   ├── config/          # Database and environment configurations
│   ├── controller/      # Logic for handling requests
│   ├── interfaces/      # TypeScript interfaces for types
│   ├── middlewares/     # Middleware for validation and error handling
│   ├── models/          # Mongoose schemas and models (User and GymClass)
│   ├── routes/          # Route definitions for the API
│   ├── services/        # Business logic and reusable services
│   ├── utility/         # Helper functions
│   ├── app.ts           # Initializes Express app
│   └── server.ts        # Entry point to start the server
├── .env                 # Environment variables
├── .gitignore           # Files to be ignored by Git
├── .prettierrc          # Prettier configuration for formatting
├── .eslint.config.mjs   # ESLint configuration for linting
├── package-lock.json    # Dependency tree lock file
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
🏁 Getting Started
Follow these steps to set up the project locally:

📂 Step 1: Clone the Repository
Clone this repository to your local machine:


git clone https://github.com/your-username/gym-management-system.git
cd gym-management-system
📦 Step 2: Install Dependencies
Install all required dependencies:


npm install
🔧 Step 3: Configure Environment Variables
Create a .env file in the root directory and add the following variables:


MONGODB_URI=your-mongodb-connection-string
PORT=5000
JWT_SECRET=your-jwt-secret
▶️ Step 4: Run the Application
Start the development server:


npm run start:dev
The application will be live at http://localhost:3000.
```
# Gym Management API Documentation

Welcome to the **Gym Management API** documentation.

---

## 🚀 Authentication

### 🔹 Register a New User (Admin Only)
**Endpoint:** `POST /api/auth/register`  
**Headers:** 
- `Authorization: Bearer <token>` (Admin only)  

**Request_Body:**
```json
{
  "name": "trainee2",
  "email": "trainee2@gmail.com",
  "password": "trainee2",
  "role": "trainee"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Congratulation to the new World!",
    "data": {
        "name": "trainee2",
        "email": "trainee2@gmail.com",
        "password": "$2b$10$hashedpassword",
        "role": "trainee",
        "_id": "67d43588656257884bdc60ab",
        "__v": 0
    }
}
```

### 🔹 User Login
**Endpoint:** `POST /api/auth/login`  

**Request Body:**
```json
{
   "email": "trainer1@gmail.com",
   "password": "trainer1"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIs..."
    }
}
```
### 🔹 User Logout
**Endpoint:** `POST /api/auth/logout`  
**Headers:**
- `Authorization: Bearer <token>`  

**Response:**
```json
{
    "success": true,
    "message": "Logout successful",
    "data": []
}
```
---

## 📅 Class Management

### 🔹 Create a Class
**Endpoint:** `POST /api/classes/create`  
**Headers:**
- `Authorization: Bearer <token>` (Valid user token required)  

**Request Body:**
```json
{
  "name": "Yoga Class2",
  "description": "A relaxing yoga session2",
  "date": "2024-07-20T10:00:00Z",
  "timeSlot": "07:00 - 09:00",
  "trainer": "67d1d323b3b9416eae30f71f"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Class created successfully",
    "data": {
        "_id": "67d436cb268417be81355fa1",
        "name": "Yoga Class2",
        "description": "A relaxing yoga session2",
        "trainer": "67d1d323b3b9416eae30f71f",
        "date": "2024-07-20T10:00:00.000Z",
        "timeSlot": "07:00 - 09:00",
        "bookedUsers": [],
        "createdAt": "2025-03-14T14:01:47.822Z",
        "updatedAt": "2025-03-14T14:01:47.822Z",
        "__v": 0
    }
}
```

#### ❌ Unauthorized User Response
```json
{
    "success": false,
    "message": "Unauthorized access!",
    "errorDetails": [
        {
            "field": "",
            "message": "Unauthorized access!"
        }
    ],
    "stack": null
}
```

---

### 🔹 Get All Classes
**Endpoint:** `GET /api/classes`  
**Headers:** 
- `Authorization: Bearer <token>`  

**Response:**
```json
{
    "success": true,
    "message": "All classes retrieved successfully!",
    "data": [
        {
            "_id": "67d1d3f256ea60b327198f5a",
            "name": "Yoga Class",
            "description": "A relaxing yoga session",
            "trainer": "67d1d323b3b9416eae30f71f",
            "date": "2024-07-20T10:00:00.000Z",
            "timeSlot": "08:00 - 10:00",
            "bookedUsers": ["67d1d323b3b9416eae30f71f"],
            "createdAt": "2025-03-12T18:35:30.221Z",
            "updatedAt": "2025-03-12T19:13:10.725Z",
            "__v": 0
        }
    ]
}
```

---

## 📌 Class Booking

### 🔹 Book a Class
**Endpoint:** `POST /api/classes/book/:classId`  
**Headers:**
- `Authorization: Bearer <token>`  

**Request Body:**
```json
{
    "traineeId": "67d1d323b3b9416eae30f71f"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Booking successfully completed!",
    "data": {
        "_id": "67d436cb268417be81355fa1",
        "bookedUsers": ["67d1d323b3b9416eae30f71f"]
    }
}
```

#### ❌ Already Booked Response
```json
{
    "success": false,
    "message": "Already Booked",
    "errorDetails": [{ "message": "Already Booked" }],
    "stack": null
}
```

---

### 🔹 Cancel a Booking
**Endpoint:** `DELETE /api/classes/cancel/:classId`  
**Headers:** 
- `Authorization: Bearer <token>`  

**Request Body:**
```json
{
    "traineeId": "67d1d323b3b9416eae30f71f"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Cancelled booking successfully!",
    "data": {
        "_id": "67d1d3f256ea60b327198f5a",
        "bookedUsers": []
    }
}
```

#### ❌ Booking Not Found Response
```json
{
    "success": false,
    "message": "Booking not found",
    "errorDetails": [{ "message": "Booking not found" }],
    "stack": null
}
```

---

### 🔹 Delete a Class
**Endpoint:** `DELETE /api/classes/:classId`  
**Headers:** 
- `Authorization: Bearer <token>` (Admin only)  

**Response:**
```json
{
    "success": true,
    "message": "Deleted class successfully!"
}
```

---

## 📌 Notes
- **Authorization and Authentication is required** for all endpoints without access all classes data view.
- **Admin can create users** and provide passwords.
- **Trainees can only book or cancel their own classes.**
- **Trainers can view his classes and his schedules**
- **postman collection added as pdf format to this repository**
-**Added Data model Drive Link**
-**Added ER Diagram as pdf format**

---

## 🎯 Happy Coding! 🚀


```plaintext
🛠️ Scripts
The following scripts are available in the package.json:

Command	Description
npm run dev	Starts the development server.
npm run build	Compiles TypeScript to JavaScript.
npm run start	Starts the production server.
npm run lint	Runs ESLint for linting.
npm run format	Formats code using Prettier.
🛠️ Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a feature branch: git checkout -b my-feature.
Commit your changes: git commit -m "Add new feature".
Push to the branch: git push origin my-feature.
Submit a pull request.
⚙️ Admin Credentials
Email: admin@gmail.com
Password: admin001
Happy coding! 🎉

```








