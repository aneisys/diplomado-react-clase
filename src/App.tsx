import { useState } from 'react';
import './App.css';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm/TaskForm';
import { TaskList } from './components/TaskList/TaskList';
import { LoginForm } from './components/LoginForm/LoginForm';
import { authApi, loadToken } from './services/authApi';
import type { CreateTaskDTO, UpdateTaskDTO } from './types/task';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!loadToken());
  const { tasks, total, loading, error, addTask, updateTask, deleteTask, toggleTaskDone, fetchTasks } =
    useTasks(isLoggedIn);

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchTasks();
  };

  const handleLogout = () => {
    authApi.logout();
    setIsLoggedIn(false);
  };

  const handleAddTask = async (data: CreateTaskDTO | UpdateTaskDTO) => {
    await addTask(data as CreateTaskDTO);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1>Gestión de Tareas</h1>
            <p>Administra tus tareas de forma sencilla</p>
            <p className="app-author">Por Angel Nayib Espinoza Ibañez</p>
          </div>
          <button className="btn btn-secondary btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="task-form-section">
          <TaskForm mode="create" onSubmit={handleAddTask} />
        </section>

        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={fetchTasks}>Reintentar</button>
          </div>
        )}

        {loading && tasks.length === 0 && (
          <div className="loading-state">Cargando tareas...</div>
        )}

        <section className="task-list-section">
          <div className="task-stats">
            <span>Total: {total}</span>
            <span className="stat-pending">
              Pendientes: {tasks.filter((t) => !t.done).length}
            </span>
            <span className="stat-completed">
              Finalizadas: {tasks.filter((t) => t.done).length}
            </span>
          </div>
          <TaskList
            tasks={tasks}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onToggleDone={toggleTaskDone}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
