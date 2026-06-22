# Daybook — To-Do Planner

![SkillCraft](https://img.shields.io/badge/SkillCraft-Technology-2C2C2C?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

A modern, responsive, and interactive To-Do Planner built using **React**, **Vite**, **JavaScript**, and **Tailwind CSS** as part of the SkillCraft Technology Web Development Internship — Task 04.

Daybook provides a clean task management experience with task creation, editing, organization by lists, due date tracking, priority management, and persistent storage using localStorage.

---

## Overview

Daybook is a productivity-focused task management application designed to help users organize their daily work efficiently.

The application enables users to:

- Create and manage tasks
- Organize tasks into multiple lists
- Set due dates and times
- Assign priority levels
- Mark tasks as complete
- Edit and delete tasks
- View grouped task sections (Today, Tomorrow, etc.)
- Persist data using localStorage

The project demonstrates practical React development concepts including state management, reusable components, custom hooks, CRUD operations, routing, and responsive UI design.

---

## Internship Details

| Field | Details |
|------|--------|
| Internship | SkillCraft Technology |
| Track | Web Development |
| Track Code | WD |
| Task Number | Task 04|
| Task Name | To-Do Planner Application |
| Repository Name | SCT_WD_4 |
| Intern ID | SCT/JUNE26/2530 |
| Project Name | Daybook |

---

## Features

### Task Management
- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete

### Organization System
- Multiple lists (Work, Personal, Shopping, Custom lists)
- Move tasks between lists
- Automatic grouping by due date:
  - Overdue
  - Today
  - Tomorrow
  - This week
  - Later
  - No date

### Sorting Options
- Sort by Date
- Sort by Priority
- Sort by Status

### Task Details
Each task includes:
- Title
- Notes
- Due date & time
- Priority level (High / Medium / Low)
- List assignment

### Data Persistence
- Uses localStorage
- Data remains after refresh
- No backend required

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend Library |
| Vite | Development & Build Tool |
| JavaScript | Application Logic |
| Tailwind CSS | Utility-First Styling |
| React Router DOM | Client-Side Routing |
| HTML5 | Structure |
| CSS3 | Styling Support |

---

## Folder Structure

```text
SCT_WD_3/
│
├── index.html
├── vite.config.js
├── package.json
├── eslint.config.js
├── .gitignore
│
├── public/
│   └── favicon.svg
│
└── src/
    │
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    │
    ├── utils/
    │   └── dates.js
    │
    ├── store/
    │   ├── taskLogic.js
    │   ├── listLogic.js
    │   ├── sortLogic.js
    │   ├── useTasks.js
    │   └── useLists.js
    │
    ├── components/
    │   ├── TaskItem.jsx
    │   ├── TaskSection.jsx
    │   ├── ListFilterBar.jsx
    │   ├── SortMenu.jsx
    │   ├── QuickAdd.jsx
    │   ├── EmptyState.jsx
    │   └── Button.jsx
    │
    └── pages/
        ├── ListPage.jsx
        └── TaskPage.jsx
```

---

## Installation & Setup

### Clone Repository
```bash
git clone https://github.com/karthikchintanippu/SCT_WD_4.git
```

### Navigate to Project
```bash
cd SCT_WD_4
```

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Open Application
```text
http://localhost:5173/
```

---

## Usage Guide

1. Launch the application
2. Create a new task
3. Assign list, priority, and due date
4. Organize tasks by category
5. Mark tasks as complete
6. Edit or delete tasks when needed
7. View grouped task sections
8. Manage productivity efficiently

---

## Learning Outcomes

- React state management
- Custom hooks
- CRUD operations
- Component-based architecture
- Routing with React Router
- localStorage persistence
- UI/UX design principles
- Modular code structure

---

## Repository

Repository: https://github.com/karthikchintanippu/SCT_WD_4

---

## Author

**CHINTANIPPU KARTHIK**

GitHub: https://github.com/karthikchintanippu

---

## Acknowledgement

This project was developed as part of the SkillCraft Technology Web Development Internship (Task 04).

---

## Footer Credit

Built by CHINTANIPPU KARTHIK · SkillCraft Technology Web Development Task 04
