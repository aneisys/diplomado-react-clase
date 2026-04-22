// Portal
/*
 z-index
 Nota: Para usar portal debemos agregar un div con un id específico en el index.html
*/
import { useState } from 'react';
import './App.css';
import { Modal } from './components';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h1>Ejemplo de portal</h1>
      <button onClick={() => setOpen(true)}>Abrir modal</button>

      {open && (
        <>
          <Modal onClose={() => setOpen(false)}>
            <h2>Hola desde el portal!</h2>
            <p>Este modal esta renderizado desde fuera del DOM padre.</p>
          </Modal>
          <h1>Ingresando</h1>
        </>
      )}
    </div>
  );
}

export default App;
