import type { Task, TaskListResponse, CreateTaskDTO, UpdateTaskDTO } from '../types/task';
import { getAuthHeaders } from './authApi';

const API_URL = 'https://taskdone-node.onrender.com/api/tasks';

class TaskApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaskApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new TaskApiError(
      errorData.message || `Error HTTP: ${response.status} ${response.statusText}`
    );
  }
  return response.json() as Promise<T>;
}

function getHeaders(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };
}

function buildQuery(params: Record<string, string | number | boolean>): string {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    qs.append(key, String(value));
  });
  const query = qs.toString();
  return query ? `?${query}` : '';
}

export const taskApi = {
  async getAll(params?: { done?: boolean; limit?: number; page?: number; orderby?: string; orderDir?: string; search?: string }): Promise<TaskListResponse> {
    const url = params ? `${API_URL}${buildQuery(params)}` : API_URL;
    const response = await fetch(url, { headers: getAuthHeaders() });
    return handleResponse<TaskListResponse>(response);
  },

  async getById(id: number): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return handleResponse<Task>(response);
  },

  async create(data: CreateTaskDTO): Promise<Task> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<Task>(response);
  },

  async update(id: number, data: UpdateTaskDTO): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TaskApiError(
        errorData.message || `Error HTTP: ${response.status} ${response.statusText}`
      );
    }
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TaskApiError(
        errorData.message || `Error HTTP: ${response.status} ${response.statusText}`
      );
    }
  },

  async patch(id: number, data: { done: boolean }): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new TaskApiError(
        errorData.message || `Error HTTP: ${response.status} ${response.statusText}`
      );
    }
  },
};
