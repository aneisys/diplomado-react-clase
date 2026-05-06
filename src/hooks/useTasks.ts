import { useEffect, useState, useCallback } from 'react';
import { taskApi } from '../services/taskApi';
import { loadToken } from '../services/authApi';
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '../types/task';

interface UseTasksReturn {
  tasks: Task[];
  total: number;
  page: number;
  pages: number;
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (data: CreateTaskDTO) => Promise<void>;
  updateTask: (id: number, data: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskDone: (id: number, currentDone: boolean) => Promise<void>;
}

export function useTasks(enabled: boolean): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      loadToken();
      const res = await taskApi.getAll({ limit: 100 });
      setTasks(res.data);
      setTotal(res.total);
      setPage(res.page);
      setPages(res.pages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar tareas');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = useCallback(async (data: CreateTaskDTO) => {
    setError(null);
    try {
      const newTask = await taskApi.create(data);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear tarea');
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id: number, data: UpdateTaskDTO) => {
    setError(null);
    try {
      await taskApi.update(id, data);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id && data.name !== undefined ? { ...t, name: data.name } : t
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar tarea');
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id: number) => {
    setError(null);
    try {
      await taskApi.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar tarea');
      throw err;
    }
  }, []);

  const toggleTaskDone = useCallback(async (id: number, currentDone: boolean) => {
    setError(null);
    try {
      await taskApi.patch(id, { done: !currentDone });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !currentDone } : t))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cambiar estado');
      throw err;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchTasks();
    }
  }, [enabled, fetchTasks]);

  return {
    tasks,
    total,
    page,
    pages,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  };
}
