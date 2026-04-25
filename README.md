# 🗓️ Timetable Scheduler Hub

A professional, full-stack application designed to generate and manage institutional schedules with precision. Built with a modern tech stack and featuring a beautiful, responsive UI.

## ✨ Features

- **Dynamic Generation**: Automatically generate timetables based on classes, subjects, and faculty availability.
- **Role-Based Access**: Specialized views for Admins, Teachers, and Students.
- **Admin Tools**:
  - Full control over institutions, classes, subjects, and faculty.
  - Interactive period swapping via drag-and-click.
  - Save and update schedules directly to the database.
  - Export to professional Excel formats.
- **Security**: 
  - JWT-based authentication.
  - Automated password hashing (bcrypt).
  - Centralized error handling and validation.
- **Modern UI**: High-performance, glassmorphic design using Tailwind CSS.

## 🚀 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, JavaScript (ES6+), html2pdf.js, SheetJS (XLSX).
- **Backend**: Node.js, Express 5.x, Mongoose.
- **Database**: MongoDB.
- **Auth**: JSON Web Tokens (JWT), bcryptjs.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (running locally or a cloud instance)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd timetable-scheduler-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`.
   - Update `MONGODB_URI` and `JWT_SECRET` with your local/cloud settings.

### Running the Application
- **Development Mode** (with nodemon):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```
- **Seed Test Users**:
  ```bash
  node createuser.js
  ```

## 📂 Project Structure

- `/models`: Mongoose schemas for Users and Timetables.
- `/routes`: API endpoints for authentication and schedule management.
- `/middleware`: Auth verification and centralized error handling.
- `/public`: Frontend assets including the main dashboard and auth pages.

## 📄 License
This project is licensed under the ISC License.
