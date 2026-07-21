# Todo-App
A simple and modern Todo App built using HTML, CSS, and JavaScript. This application allows users to create, manage, search, filter, edit, and delete tasks. It also supports due dates, task completion tracking, dark/light mode, and browser localStorage for persistent data storage.

## Table of Contents

- [Features](#Features)
- [Technologies Used](#TechnologiesUsed)
- []()

## Live Demo
![](https://todo-app-webpage.netlify.app/)

## Features
- Add new tasks
- Set a due date for tasks
- Mark tasks as completed
- Delete tasks with confirmation
- Edit tasks by double-clicking the task text
- Search tasks by name
- Filter tasks:
    - All Tasks
    - Completed
    - Pending
- View task statistics:
    - Total tasks
    - Completed tasks
    - Pending tasks
- Automatically highlights overdue tasks
- Dark mode
- Light mode
- Saves tasks using browser localStorage
- Saves selected theme preference
- Responsive design for mobile devices
- Empty state message when there are no tasks

## Technologies Used
- HTML5 – Structure of the application
- CSS3 – Styling, responsive design, and theme management
- JavaScript (ES6) – Application logic and DOM manipulation
- LocalStorage API – Persistent storage of tasks and theme preferences
- SVG – Icons for task completion and deletion

## How to Use
### Add a Task
- Enter your task in the input field.
- Select a due date if required.
- Click the ADD button.
4) The task will be displayed in the task list.
### Complete a Task
- Click the checkbox next to a task to mark it as completed.
- Completed tasks will be visually marked with a strikethrough.

### Edit a Task
- Double-click on the task text to edit it.
- Press Enter or click outside the input field to save the changes.
- Press Escape to cancel editing.

### Delete a Task
- Click the delete icon next to a task.
- A confirmation message will appear before deleting the task.

### Search Tasks
- Use the search box to find tasks by entering part of the task name.

### Filter Tasks
- Use the filter dropdown to view:
    - All Tasks
    - Completed Tasks
    - Pending Tasks

### Change Theme
- Click the theme button in the top-right corner to switch between:
    - Dark Mode
    - Light Mode
- Your selected theme will be saved in the browser.

### Data Persistence

- This application uses the browser's LocalStorage API to save todo data.
- Tasks are stored locally in the browser, so they remain available even after refreshing or reopening the page on the same browser and device.
- The application also stores the user's selected theme preference in localStorage.
    - Note: Since the application uses browser local storage, tasks are not synchronized between different browsers or devices.

### Due Date & Overdue Tasks
- Each task can have an optional due date.
- If a task has a due date that has already passed and the task is not completed, it is automatically highlighted as overdue.

###Task Statistics
- The application dynamically displays:
- Total: 5 | Completed: 2 | Pending: 3

- The statistics are automatically updated when tasks are added, completed, or deleted.

##Responsive Design
- The application is designed to work on different screen sizes.
- On smaller devices:
    - The Add button moves below the input field.
    - Search and filter controls are displayed vertically.
    - The heading size adjusts automatically.
    - The layout becomes mobile-friendly.
