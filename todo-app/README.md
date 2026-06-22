# Daybook — To-Do Planner

A basic to-do app built with **Vite + React**, **React Router**, **Tailwind CSS**, and **CSS Modules**. Add tasks, organize them by due date, mark them complete, edit them, and set a date and time for each.

## Stack

- **Vite** — dev server and build tool
- **React 18** — UI
- **React Router v6** — routes for the task list and the create/edit screen
- **Tailwind CSS** — layout, spacing, utility styling
- **CSS Modules** — bespoke visuals (the custom checkbox, the quick-add bar, the form fields)
- **localStorage** — tasks persist across page reloads, no backend required

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

## Features

- **Add tasks** — quick-add bar on the list page, or the full form (with notes, date/time, list, priority) via "New task"
- **Organize automatically** — when sorted by date, tasks group themselves under Overdue / Today / Tomorrow / This week / Later / No date
- **Multiple lists** — Work, Personal, and Shopping out of the box; add your own with "+ New list" in the filter bar
- **Move tasks between lists** — use the "Move" control on any task row (appears on hover), or change the List field on the edit page
- **Sort tasks** — by Date (groups into the planner buckets above), Priority (High → Medium → Low), or Status (open tasks first, completed last)
- **Mark complete** — click the checkbox; completed tasks move to a "Completed" section at the bottom
- **Edit** — click any task to open it on its own page and change anything, including list and priority
- **Delete** — from the list (hover to reveal "Delete") or from the edit page
- **Set date & time** — both fields on the edit page; time is optional and disabled until a date is chosen

## Project structure

```
src/
  utils/
    dates.js              # Pure date helpers: bucket a due date into Today/Tomorrow/etc, format for display
  store/
    taskLogic.js            # Pure task CRUD: createTask, addTask, updateTask, deleteTask, toggleComplete, moveTaskToList
    listLogic.js              # Pure list CRUD: createList, addList, renameList, deleteList; DEFAULT_LISTS
    sortLogic.js                # sortTasks(tasks, mode) — comparators for date / priority / status
    useTasks.js                   # React hook wrapping taskLogic + localStorage persistence
    useLists.js                     # React hook wrapping listLogic + localStorage persistence
  components/
    TaskItem.jsx                      # A single task row (checkbox, priority dot, list badge, move-to-list, delete)
    TaskItem.module.css
    TaskSection.jsx                     # A labeled group of tasks (e.g. "Today")
    ListFilterBar.jsx                     # Pill-style tabs to filter by list, plus "+ New list"
    ListFilterBar.module.css
    SortMenu.jsx                            # Dropdown to switch sort mode
    SortMenu.module.css
    QuickAdd.jsx                              # Single-line input for fast task entry
    QuickAdd.module.css
    EmptyState.jsx
    Button.jsx
  pages/
    ListPage.jsx                                # Main view: list filter, sort menu, grouped/sorted task list, quick add
    ListPage.module.css
    TaskPage.jsx                                   # Create/edit a task: title, notes, due date & time, list, priority
    TaskPage.module.css
  App.jsx                                            # Routes + shared task/list state
  main.jsx                                             # Entry point, wraps App in BrowserRouter
  index.css                                             # Tailwind directives + base styles
```

## How it's organized

- **`utils/dates.js`**, **`store/taskLogic.js`**, **`store/listLogic.js`**, and **`store/sortLogic.js`** have no React or DOM dependencies — they're plain functions operating on plain data, so they're simple to unit test on their own.
- **`store/useTasks.js`** and **`store/useLists.js`** are the only places that touch `localStorage`. Each behaves like `useState` — `const [tasks, setTasks] = useTasks()` — so the rest of the app doesn't need to know persistence is happening at all.
- Each task is `{ id, title, notes, dueDate, dueTime, listId, priority, completed, createdAt }`. `listId` references a list's `id` or is `null` ("No list"). `priority` is `'high' | 'medium' | 'low'`.
- Each list is `{ id, name, color }`.
- **Sort and grouping interact deliberately**: sorting by Date keeps the planner-style bucket headings (Overdue/Today/etc) since the two ideas reinforce each other. Sorting by Priority or Status switches to one flat list instead, since buckets don't add anything meaningful in that view.

## Routes

| Path           | Page                                    |
|-----------------|-------------------------------------------|
| `/`              | Task list — filter by list, sort, quick add |
| `/task/new`        | Create a new task                          |
| `/task/:id`           | Edit an existing task                        |

## Design notes

The visual language is a daily planner page rather than a generic card list: a warm parchment background, a serif (Fraunces) heading, and tasks grouped under date headings the way you'd organize a notebook. A single terracotta accent marks the active/primary actions; overdue tasks get a left accent bar and rust-colored due label so urgency reads at a glance without relying on color alone in the body text. Each list gets its own color dot (shown in the filter pills and, when viewing "All", as a small badge on each task), and each task carries a small priority dot — both are colored but always paired with text/labels so meaning isn't conveyed by color alone.
