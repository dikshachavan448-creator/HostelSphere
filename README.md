#  HostelSphere

### Hostel Management & Community Platform

HostelSphere is a full-stack web application designed to simplify hostel management and improve communication between students and administrators.

It provides students with an easy-to-use platform for managing complaints, leave requests, notices, and their hostel activities, while administrators can manage students and monitor hostel operations through a dedicated admin dashboard.

---

## ✨ Features

### 👨‍🎓 Student Module

* 🔐 Student registration and login
* 📊 Student dashboard
* 📝 Submit hostel complaints
* 📋 View personal complaints and their status
* 🛫 Submit leave requests
* 📅 View leave history and request status
* 📢 View hostel notices
* 🔒 JWT-based authentication

### 👨‍💼 Admin Module

* 🔐 Secure admin login
* 📊 Admin dashboard
* 👥 Manage students
* 📝 Manage student complaints
* 🛫 Manage leave requests
* 📢 Manage hostel notices
* 🔒 Role-based access control

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt.js

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

---

## 🔐 Authentication & Security

HostelSphere uses JWT-based authentication to protect user accounts and application routes.

The application supports:

* Student authentication
* Admin authentication
* Password hashing using bcrypt
* Protected routes
* Role-based access control
* Environment variables for sensitive configuration

---

## 📂 Project Structure

```text
HostelSphere/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
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

## 🚀 Live Demo

**Coming soon — deployment in progress.**

Once deployed, the live application will be available here:

🔗 **[HostelSphere Live Demo](YOUR_DEPLOYED_URL)**

---

## 🔑 Demo Credentials

### Admin Account

```text
Email: admin@gmail.com
Password: admin123
```

### Demo Student Account

```text
Roll number : ENTC006
Password: diya04
```

> These credentials are provided for demonstration purposes only.

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

Install the root dependencies:

```bash
npm install
```

Then install frontend dependencies:

```bash
cd client
npm install
```

Then install backend dependencies:

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create the required `.env` file in the server directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit your `.env` file to GitHub.

### 5. Start the backend

From the `server` directory:

```bash
npm run dev
```

### 6. Start the frontend

From the `client` directory:

```bash
npm run dev
```

The application can then be accessed through the local Vite development URL.

---

## 🌱 Demo Data

The project includes a seed script for creating demonstration data such as:

* Admin account
* Student accounts
* Sample complaints
* Sample leave requests
* Sample notices

The seed data is designed to preserve existing database records rather than deleting them.

---

## 🎯 Project Goals

HostelSphere was developed to provide a centralized digital platform for common hostel management activities.

The project focuses on:

* Simplifying hostel administration
* Improving student communication
* Digitizing complaint and leave management
* Providing role-based access
* Maintaining centralized hostel data

---

## 📸 Screenshots

Screenshots of the application will be added here.

---

## 👩‍💻 Author

**Diksha Chavan**

Full-Stack Hostel Management & Community Platform built as a web development project.

---

⭐ If you find this project interesting, feel free to explore the repository and try the application once the live demo is available.
