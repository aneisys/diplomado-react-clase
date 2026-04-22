import { Controller, type Control, type FieldError } from 'react-hook-form';
import type { FormValues } from '../../models';
import './CustomInput.css';

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ control, label, name, error, type }: Props) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            id={name}
            type={type}
            {...field}
            className={`form-control ${error ? 'is-invalid' : ''}`}
          />
        )}
      />
      {error && <div className="error">{error.message}</div>}
    </div>
  );
};

export default InputForm;
