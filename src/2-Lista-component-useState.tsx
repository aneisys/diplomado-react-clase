import { useState } from 'react';
import './App.css';
import { AgregarTarea } from './components';

interface PropsItem {
  nombre: string;
  hecho: boolean;
}

const Item = ({ hecho, nombre }: PropsItem) => {
  return (
    <li>
      {nombre} {hecho ? 'SI' : 'NO'}
    </li>
  );
};

function App() {
  const lista = [
    {
      id: 0,
      nombre: 'Despertar',
      hecho: true,
    },
    {
      id: 1,
      nombre: 'Trabajar',
      hecho: true,
    },
    {
      id: 2,
      nombre: 'Clases',
      hecho: false,
    },
  ];

  const [tareas, setTareas] = useState(lista);

  const onAgregarTarea = (nombre: string) => {
    if (nombre.length === 0) return;
    const nuevaTarea = {
      id: lista.length,
      nombre,
      hecho: false,
    };
    setTareas([...tareas, nuevaTarea]);
  };

  return (
    <section id="center">
      <h1>Lista de tareas</h1>
      <ol>
        {tareas.map((tarea) => (
          <Item key={tarea.id} nombre={tarea.nombre} hecho={tarea.hecho} />
        ))}
        <AgregarTarea agregarTarea={onAgregarTarea} />
      </ol>
    </section>
  );
}

export default App;
