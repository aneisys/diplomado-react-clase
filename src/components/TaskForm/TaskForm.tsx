import { useState, type FormEvent } from 'react';
import type { CreateTaskDTO, UpdateTaskDTO } from '../../types/task';
import './TaskForm.css';

interface TaskFormProps {
  onSubmit: (data: CreateTaskDTO | UpdateTaskDTO) => void;
  initialData?: { name: string; done: boolean };
  mode: 'create' | 'edit';
  onCancel?: () => void;
}

export const TaskForm = ({ onSubmit, initialData, mode, onCancel }: TaskFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [done, setDone] = useState<boolean>(initialData?.done ?? false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    if (!name.trim()) {
      setError('El nombre de la tarea es requerido');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (mode === 'create') {
      onSubmit({ name: name.trim() });
      setName('');
      setDone(false);
    } else {
      onSubmit({ name: name.trim(), done });
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{mode === 'create' ? 'Nueva Tarea' : 'Editar Tarea'}</h3>

      <div className="form-group">
        <label htmlFor="name">Nombre de la tarea</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={error ? 'is-invalid' : ''}
          placeholder="Ej: Estudiar React"
        />
        {error && <span className="error-text">{error}</span>}
      </div>

      {mode === 'edit' && (
        <div className="form-group">
          <label htmlFor="done">Estado</label>
          <select
            id="done"
            value={done ? 'true' : 'false'}
            onChange={(e) => setDone(e.target.value === 'true')}
          >
            <option value="false">Pendiente</option>
            <option value="true">Finalizada</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {mode === 'create' ? 'Crear Tarea' : 'Guardar Cambios'}
        </button>
        {mode === 'edit' && onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};
