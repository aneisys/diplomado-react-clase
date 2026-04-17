import { useState } from 'react';

interface Props {
  agregarTarea: (tarea: string) => void;
}

export const AgregarTarea = ({ agregarTarea }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    agregarTarea(inputValue)
    setInputValue('')
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Ingrese una nueva tarea"
          value={inputValue}
          onChange={onInputValue}
        />
      </form>
      <p>valor: {inputValue}</p>
    </>
  );
};
