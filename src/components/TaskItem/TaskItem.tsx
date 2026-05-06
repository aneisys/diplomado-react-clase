import { useState } from 'react';
import type { Task, UpdateTaskDTO } from '../../types/task';
import { TaskForm } from '../TaskForm/TaskForm';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: UpdateTaskDTO) => void;
  onToggleDone: (id: number, currentDone: boolean) => void;
}

export const TaskItem = ({ task, onDelete, onUpdate, onToggleDone }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (data: UpdateTaskDTO) => {
    onUpdate(task.id, data);
    setIsEditing(false);
  };

  const statusLabel = task.done ? 'Finalizada' : 'Pendiente';

  if (isEditing) {
    return (
      <div className="task-item task-item--editing">
        <TaskForm
          mode="edit"
          initialData={{ name: task.name, done: task.done }}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`task-item task-item--${task.done ? 'completed' : 'pending'}`}>
      <div className="task-content">
        <h4 className="task-title">{task.name}</h4>
        <span className={`task-status task-status--${task.done ? 'completed' : 'pending'}`}>
          {statusLabel}
        </span>
      </div>

      <div className="task-actions">
        <button
          className="btn btn-toggle"
          onClick={() => onToggleDone(task.id, task.done)}
          title={task.done ? 'Marcar como Pendiente' : 'Marcar como Finalizada'}
        >
          {task.done ? '↺' : '✓'}
        </button>

        <button
          className="btn btn-edit"
          onClick={() => setIsEditing(true)}
          title="Editar"
        >
          ✎
        </button>

        <button
          className="btn btn-delete"
          onClick={() => onDelete(task.id)}
          title="Eliminar"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
