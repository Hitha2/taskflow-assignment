# TaskFlow - Full-Stack Task Board

TaskFlow is a full-stack task management application developed as part of the TaskFlow Full-Stack Developer Take-Home Assignment.

The application allows users to manage tasks through a simple task board with columns such as To Do, In Progress, and Done.

## Features

- View tasks organized into columns
- Create new tasks
- Edit existing tasks
- Delete tasks
- Move tasks between columns
- Set task priority
- Filter tasks by priority
- Persistent data storage using SQLite
- REST API using Express.js
- Backend validation
- Error handling
- Seed data for the database
- Automated backend tests using Jest and Supertest

## Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- CSS

### Backend

- Node.js
- Express.js
- CORS

### Database

- SQLite
- better-sqlite3

### Testing

- Jest
- Supertest

## Project Structure

```text
TaskFlow/
│
├── .gitignore
├── README.md
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   │
│   │   ├── database/
│   │   │   ├── db.js
│   │   │   ├── schema.sql
│   │   │   └── seed.js
│   │   │
│   │   ├── queries/
│   │   │   └── taskQueries.js
│   │   │
│   │   ├── routes/
│   │   │   ├── boardRoutes.js
│   │   │   └── taskRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── task.test.js
│   │
│   ├── package.json
│   └── package-lock.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Column.jsx
    │   │   ├── EditTaskModal.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── Taskcard.jsx
    │   │
    │   ├── services/
    │   │   └── api.js
    │   │
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    │
    ├── package.json
    └── package-lock.json

## Database

The application uses SQLite as the relational database.

The database files are located in:

backend/src/database/

The database contains relationships between boards, columns, and tasks.

The main relationship is:

Board
  |
  └── Columns
        |
        └── Tasks
Board

A board contains multiple columns.

Column

A column belongs to a board and contains tasks.

Example columns:

To Do
In Progress
Done
Task

A task contains information such as:

Title
Description
Column
Priority
Creation date

The database schema is available in:

backend/src/database/schema.sql
## Seed Data

Initial data is provided through:

backend/src/database/seed.js

The seed data creates the required initial board, columns, and sample tasks.

This allows the application to be tested with a fresh database.

## SQL Queries

Database queries are organized in:

backend/src/queries/taskQueries.js

The application uses SQL queries for operations such as:

Retrieving tasks
Creating tasks
Updating tasks
Deleting tasks
Moving tasks between columns
Filtering tasks by priority
Retrieving board and column information

The actual SQL queries used by the application can be found in:

backend/src/queries/taskQueries.js
Backend API

The backend is built using Node.js and Express.js.

The main server file is:

backend/src/server.js
Board Routes

Board-related routes are located in:

backend/src/routes/boardRoutes.js
Task Routes

Task-related routes are located in:

backend/src/routes/taskRoutes.js

The API supports task management operations including:

Create task
Read tasks
Update task
Delete task
Move task
Filter tasks
Validation

Task title validation is implemented on the backend.

A task cannot be created with an empty title.

This ensures that invalid requests cannot bypass frontend validation.

Example:

User enters task
       |
       v
Frontend validation
       |
       v
Backend API
       |
       v
Backend validation
       |
       v
SQLite database
## Error Handling

The application handles API and backend errors and provides user-friendly feedback.

This prevents the application from failing silently when an API request or database operation fails.

## Frontend

The frontend is developed using React.js and Vite.

The frontend source code is located in:

frontend/src/
Main Components
TaskForm.jsx

Used to create new tasks.

EditTaskModal.jsx

Used to edit existing tasks.

Taskcard.jsx

Displays individual task information.

Column.jsx

Displays a task column and its tasks.

App.jsx

Main application component.

api.js

Handles communication between the React frontend and the backend API.

Task Management Flow

The task creation process works as follows:

User enters task details
        |
        v
React form
        |
        v
API request
        |
        v
Express route
        |
        v
Task controller
        |
        v
SQLite database
        |
        v
Response
        |
        v
Frontend updates the board

Task movement works as follows:

User selects a different column
        |
        v
Frontend sends update request
        |
        v
Express backend
        |
        v
Database updates task column
        |
        v
Updated task returned
        |
        v
Frontend displays task in new column
## Testing

Backend tests are implemented using Jest and Supertest.

Tests are located in:

backend/tests/task.test.js

The tests cover important backend behavior including:

Validation of task title
Task creation
Task movement
Database query behavior

To run the tests:

cd backend
npm test
Installation
Prerequisites

Make sure you have the following installed:

Node.js
npm
Git
Clone the Repository
git clone https://github.com/YOUR_USERNAME/taskflow-assignment.git

Navigate into the project:

cd taskflow-assignment
Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Start the backend:

npm start

If the start script is not configured, run:

node src/server.js
Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

Vite will provide a local development URL in the terminal.

For example:

http://localhost:5173

Open the URL in your browser.

Environment Variables

If environment variables are required, create a .env file according to the backend configuration.

Example:

PORT=5000

Do not commit .env files to GitHub.

Git Ignore

The following files and folders are excluded from the Git repository:

node_modules/
.env
*.db
*.sqlite
*.sqlite3

Dependencies can be installed again using:

npm install
Design Decisions and Assumptions
SQLite Database

SQLite was selected as the database because it is a relational database and is suitable for this assignment without requiring a separate database server.

Single Board

The application focuses on the task board functionality required by the assignment.

No Authentication

User authentication and accounts were not implemented because they are outside the core requirements of the assignment.

Task Movement

Tasks can be moved between columns while maintaining their data in the database.

Backend Validation

Validation is implemented on the backend in addition to the frontend to prevent invalid requests from being accepted directly through the API.

Possible Improvements

With additional development time, the following features could be added:

Drag-and-drop task movement
Task search
More advanced filtering
Task due dates
Task labels
User authentication
Multiple boards
User-specific tasks
Improved loading indicators
More comprehensive automated tests
Cloud deployment
What I Learned
