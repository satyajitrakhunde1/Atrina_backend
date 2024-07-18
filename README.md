# Advanced Task Management System Backend

## Project Description
This project is a backend for a task management system that supports role-based authentication. Admins have full access to manage tasks, while Users can only manage their own tasks. It uses RESTful APIs for CRUD operations.

## Technology Stack
- Node.js
- Express
- MongoDB
- JWT for authentication

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/task-management-system.git
    cd task-management-system
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```plaintext
    MONGODB_URL=mongodb://localhost:27017/taskmanagement
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```

4. Start the server:
    ```bash
    npm run start
    ```

## API Endpoints

### Authentication
- `POST /api/register`: Register a new user
- `POST /api/login`: Login and get a JWT token

### Tasks
- `GET /api/tasks`: Get all tasks (Admin) or user-specific tasks (User)
- `POST /api/tasks`: Add a new task
- `PUT /api/tasks/:taskId`: Update a task
- `DELETE /api/tasks/:taskId`: Delete a task
- `GET /api/tasks/search`: Search tasks by name (User) or name and author (Admin)

## Role-Based Access Control
- **Admin**: Can perform all operations on any task.
- **User**: Can only perform operations on tasks they own.

## Author
Satyajit Rakhunde
