// Patron Composition Patterns

import './App.css';
import { Card, CardBody, CardFooter, CardHeader } from './components';

function App() {
  return (
    <Card>
      <CardHeader title="Diplomnado en React" subtitle="Subtitulo" />
      <CardBody>
        <p>Aprender composition patter</p>
      </CardBody>
      <CardFooter>
        <button>Entrar</button>
        <button>Salir</button>
      </CardFooter>
    </Card>
  );
}

export default App;
