# Daybook — To-Do Planner

![SkillCraft](https://img.shields.io/badge/SkillCraft-Technology-2C2C2C?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)

A basic to-do app built with **Vite + React**, **React Router**, **Tailwind CSS**, and **CSS Modules**. Add tasks, organize them by due date, mark them complete, edit them, and set a date and time for each.

---

## Stack

- **Vite** — dev server and build tool  
- **React 18** — UI  
- **React Router v6** — routes for task list and create/edit screens  
- **Tailwind CSS** — layout, spacing, utility styling  
- **CSS Modules** — custom UI components (checkboxes, task rows, forms)  
- **localStorage** — persistent data storage (no backend required)

---

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

---

## Features

### Task Management

- Add tasks using quick-add or full form
- Edit existing tasks
- Delete tasks
- Mark tasks as complete

### Organization

- Multiple lists (Work, Personal, Shopping, custom lists)
- Move tasks between lists
- Automatic grouping by due date:
  - Overdue
  - Today
  - Tomorrow
  - This week
  - Later
  - No date

### Sorting Options

- By Date (with smart grouping)
- By Priority (High → Low)
- By Status (Open → Completed)

### Task Details

Each task supports:

- Title
- Notes
- Due date & time
- Priority (High / Medium / Low)
- List assignment

### Persistence

- All tasks stored in **localStorage**
- Data persists after refresh
- No backend required

---

## Project structure

```text
src/
  utils/
    dates.js              # Date grouping helpers (Today, Tomorrow, etc.)
  store/
    taskLogic.js          # Task CRUD logic
    listLogic.js          # List CRUD logic
    sortLogic.js          # Sorting logic
    useTasks.js           # Tasks state + localStorage hook
    useLists.js           # Lists state + localStorage hook
  components/
    TaskItem.jsx
    TaskItem.module.css
    TaskSection.jsx
    ListFilterBar.jsx
    ListFilterBar.module.css
    SortMenu.jsx
    SortMenu.module.css
    QuickAdd.jsx
    QuickAdd.module.css
    EmptyState.jsx
    Button.jsx
  pages/
    ListPage.jsx
    ListPage.module.css
    TaskPage.jsx
    TaskPage.module.css
  App.jsx
  main.jsx
  index.css
```

---

## Architecture Notes

- Pure logic files (`utils/`, `store/`) are framework-free and testable
- Hooks (`useTasks`, `useLists`) handle **state + persistence**
- UI components remain stateless where possible
- Tasks follow structure:

```js
{
  id,
  title,
  notes,
  dueDate,
  dueTime,
  listId,
  priority,
  completed,
  createdAt
}
```

- Lists follow structure:

```js
{
  id,
  name,
  color
}
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Task List (dashboard) |
| `/task/new` | Create Task |
| `/task/:id` | Edit Task |

---

## Design Notes

Daybook is designed like a **real paper planner**:

- Warm, notebook-style UI
- Clear date-based grouping
- Priority indicators for urgency
- List-based organization with color tags
- Minimal but functional layout
- Focus on readability and quick task entry

---

## Learning Outcomes

- React state architecture
- Custom hooks design
- CRUD operations in frontend apps
- localStorage persistence
- Component-driven development
- Routing with React Router
- Clean UI/UX structuring
- Modular CSS architecture

---

## Repository

Repository: https://github.com/karthikchintanippu/SCT_WD_3

---

## Author

**CHINTANIPPU KARTHIK**

GitHub: https://github.com/karthikchintanippu

---

## Acknowledgement

This project was developed as part of the SkillCraft Technology Web Development Internship (Task 03).

---

## Footer Credit

Built by CHINTANIPPU KARTHIK · SkillCraft Technology Web Development Task 03
