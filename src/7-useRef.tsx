// useRef
// Es un hook que devuelve un objeto con una sola propiedad .current
// Persistencia: El valor se mantiene entre renderizado
// Silencio: Cambiar el valor del .current NO PROVOCA UN NUEVO RENDERIZADO

import './App.css';
import { FocusHelper } from './components';

// Forma correcta 2
function App() {
  return <FocusHelper />;
}

export default App;
