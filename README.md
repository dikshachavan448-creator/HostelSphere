#  HostelSphere

### Hostel Management & Community Platform

HostelSphere is a full-stack web application designed to simplify hostel management and improve communication between students and administrators.

Students can manage complaints, leave requests, notices, and hostel activities through a dedicated dashboard, while administrators can manage students, complaints, leave requests, and notices through a secure admin panel.

---

## 🚀 Live Demo

🌐 **Frontend:**
https://hostel-sphere-inky.vercel.app/

🔗 **GitHub Repository:**
https://github.com/dikshachavan448-creator/HostelSphere

---

## 🔑 Demo Credentials

### 👨‍💼 Admin Account

```text
Email: admin@gmail.com
Password: admin123
```

### 👨‍🎓 Demo Student Account

```text
Roll Number: ENTC006
Password: diya04
```

> These credentials are provided for demonstration purposes only.

---

## ✨ Features

### 👨‍🎓 Student Module

*  Student login and authentication
*  Personalized student dashboard
*  Submit hostel complaints
*  View submitted complaints and their status
*  Submit leave requests
*  View leave request history
*  View hostel notices
*  View student profile
*  JWT-protected routes

### 👨‍💼 Admin Module

*  Secure admin authentication
*  Admin dashboard with hostel statistics
*  Manage registered students
*  View and manage student complaints
*  View and manage leave requests
*  Create, update, and delete hostel notices
*  Role-based access control
*  Monitor hostel activities from a centralized dashboard

---

## 🛠️ Tech Stack

### Frontend

*  React.js
*  Vite
*  Tailwind CSS
*  React Router
*  Axios
*  Lucide React
*  React Hot Toast

### Backend

*  Node.js
*  Express.js
*  JWT Authentication
*  bcrypt.js
*  REST API
*  CORS

### Database

*  MongoDB
*  MongoDB Atlas
*  Mongoose

### Deployment

*  **Vercel** — Frontend
*  **Render** — Backend
*  **MongoDB Atlas** — Database

---

##  Application Architecture

```text
                    ┌──────────────────────┐
                    │       Students       │
                    │          │           │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React + Vite      │
                    │    Tailwind CSS      │
                    └──────────┬───────────┘
                               │
                             Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │       REST API       │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             JWT Authentication      Mongoose
                                          │
                                          ▼
                                ┌──────────────────┐
                                │  MongoDB Atlas   │
                                └──────────────────┘
```

---

##  Authentication & Security

HostelSphere uses JWT-based authentication to protect user accounts and application routes.

Security features include:

*  JWT-based authentication
*  Protected student routes
*  Protected admin routes
*  Role-based access control
*  Password hashing using bcrypt
*  Environment variables for sensitive configuration
*  Unauthorized access prevention

The backend validates authentication tokens before allowing access to protected resources.

---

## 📂 Project Structure

```text
HostelSphere/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── app.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## ⚙️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/dikshachavan448-creator/HostelSphere.git
```

### 2. Navigate into the project

```bash
cd HostelSphere
```

### 3. Install dependencies

Install root dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> ⚠️ Never commit `.env` files or database credentials to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

### 6. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The application will be available through the Vite development URL.

---

##  Demo Data

HostelSphere includes a seed script for generating demonstration data.

The seed data can include:

*  Admin account
*  Student accounts
*  Sample complaints
*  Sample leave requests
*  Sample notices

The seed process is designed to preserve existing database records rather than unnecessarily deleting them.

---

## 📊 Main Application Modules

| Module             | Description                                |
| ------------------ | ------------------------------------------ |
| Authentication     | Student and admin login using JWT          |
| Student Dashboard  | Overview of complaints, leaves and notices |
| Complaints         | Submit, track and manage complaints        |
| Leave Management   | Submit and manage leave requests           |
| Notice Board       | Display hostel announcements               |
| Student Management | Admin management of registered students    |
| Admin Dashboard    | Centralized hostel management statistics   |
| Admin Controls     | Manage complaints, leaves and notices      |

---

## 🎯 Project Objectives

HostelSphere was developed to provide a centralized digital platform for common hostel management activities.

The project focuses on:

* Simplifying hostel administration
* Digitizing hostel complaint management
* Streamlining leave request management
* Improving communication between students and administrators
* Providing centralized hostel information
* Implementing secure role-based access
* Reducing dependency on manual hostel management processes

---

## 📸 Screenshots

### Student Dashboard

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111109" src="https://github.com/user-attachments/assets/58f33e71-1b62-4a7e-be4b-d45298a2b314" />


### Complaint Management

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111158" src="https://github.com/user-attachments/assets/63ae6a36-2786-4110-92cb-81ea7988896a" />


### Leave Management

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111244" src="https://github.com/user-attachments/assets/ff7f340e-0307-4373-90f2-d23d53c60270" />


### Notice Board

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111302" src="https://github.com/user-attachments/assets/beb3f8e9-9983-4f04-b68a-cf602ea04761" />


### Admin Dashboard

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111405" src="https://github.com/user-attachments/assets/2925eabf-1834-411f-b037-6beebf309618" />


### Admin Management

<img width="1920" height="1200" alt="Screenshot 2026-08-09 111526" src="https://github.com/user-attachments/assets/ec7820af-d79f-4bf7-adb3-6eb6e9722969" />
<img width="1920" height="1200" alt="Screenshot 2026-08-09 111540" src="https://github.com/user-attachments/assets/3343bdee-1812-4880-b24e-6e8ca61a0cda" />
<img width="1920" height="1200" alt="Screenshot 2026-08-09 111554" src="https://github.com/user-attachments/assets/28381e24-4172-4d32-b1df-8af4d05398c3" />
<img width="1920" height="1200" alt="Screenshot 2026-08-09 111427" src="https://github.com/user-attachments/assets/90d40b84-101c-49de-b6d8-fdbc84798244" />


---

## 🚀 Deployment

HostelSphere uses a modern cloud deployment architecture:

```text
GitHub
   │
   ├── Frontend ──► Vercel
   │
   └── Backend ───► Render
                       │
                       ▼
                 MongoDB Atlas
```

The production frontend communicates with the deployed backend API, which connects to MongoDB Atlas for persistent data storage.

---

## 🔮 Future Improvements

Potential future enhancements include:

*  Improved mobile responsiveness
*  Real-time notifications
*  Email notifications
*  Forgot password functionality
*  Email verification
*  Additional staff and warden roles
*  Advanced analytics and reports
*  Hostel event management
*  Community discussion features
*  Image/file uploads for complaints

---

## 👩‍💻 Author

### Diksha Chavan

**Full-Stack Web Developer | ENTC Engineering Student**

HostelSphere was developed as a full-stack web development project using React, Node.js, Express, and MongoDB.

🔗 **GitHub:**
https://github.com/dikshachavan448-creator

---

##  Support

If you find HostelSphere interesting, feel free to explore the repository and the project.

---

###  HostelSphere

**Simplifying hostel management through technology.**
