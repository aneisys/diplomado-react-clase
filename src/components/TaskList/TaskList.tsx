import type { Task, UpdateTaskDTO } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: UpdateTaskDTO) => void;
  onToggleDone: (id: number, currentDone: boolean) => void;
}

export const TaskList = ({ tasks, onDelete, onUpdate, onToggleDone }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No hay tareas. ¡Crea una nueva!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onToggleDone={onToggleDone}
        />
      ))}
    </div>
  );
};
