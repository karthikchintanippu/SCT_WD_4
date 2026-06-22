import { Routes, Route } from 'react-router-dom'
import { useTasks } from './store/useTasks.js'
import { useLists } from './store/useLists.js'
import ListPage from './pages/ListPage.jsx'
import TaskPage from './pages/TaskPage.jsx'

export default function App() {
  const [tasks, setTasks] = useTasks()
  const [lists, setLists] = useLists()

  return (
    <Routes>
      <Route path="/" element={<ListPage tasks={tasks} setTasks={setTasks} lists={lists} setLists={setLists} />} />
      <Route path="/task/new" element={<TaskPage tasks={tasks} setTasks={setTasks} lists={lists} setLists={setLists} />} />
      <Route path="/task/:id" element={<TaskPage tasks={tasks} setTasks={setTasks} lists={lists} setLists={setLists} />} />
      <Route path="*" element={<ListPage tasks={tasks} setTasks={setTasks} lists={lists} setLists={setLists} />} />
    </Routes>
  )
}
