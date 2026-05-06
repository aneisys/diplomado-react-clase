export interface Task {
  id: number;
  name: string;
  done: boolean;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskListResponse {
  total: number;
  page: number;
  pages: number;
  data: Task[];
}

export interface CreateTaskDTO {
  name: string;
}

export interface UpdateTaskDTO {
  name?: string;
  done?: boolean;
}
