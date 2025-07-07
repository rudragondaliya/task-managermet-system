 📋 Task Management System - React + Firebase

**Live Demo:**
[https://task-managermet-system.vercel.app](https://task-managermet-system.vercel.app)

### 🔧 Features

• Add new tasks with title, description, due date and time
• View all tasks in a modern UI
• Task status management (Pending or Completed)
• Realtime CRUD operations connected to Firebase Realtime Database
• Responsive Bootstrap-based design
• Built with Redux Toolkit and Axios
• Deployed on Vercel

### 🧩 Tech Stack

• React + Vite
• Firebase (Realtime Database)
• Redux Toolkit
• Axios
• React Router DOM
• Bootstrap

### 🚀 Project Structure

* `App.jsx` – Routing and layout
* `/pages` – Contains main pages like Dashboard, AllTasks, and AddTask
* `/components` – UI components like Hero, Navbar, etc.
* `/features` – Redux slice and thunk logic
* `/api/axiosInstances.js` – Configured Axios instance for Firebase

### 🛠️ Setup Instructions

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root with Firebase config:

   ```
   VITE_FIREBASE_DATABASE_URL=https://your-db.firebaseio.com/
   ```
4. Run the development server:

   ```
   npm run dev
   ```

### ✨ Deployed App

Check it out live:
**[https://task-managermet-system.vercel.app](https://task-managermet-system.vercel.app)**

---
