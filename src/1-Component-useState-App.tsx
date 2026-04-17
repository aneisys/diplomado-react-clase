import { useState } from 'react';
import './App.css';
import { Button } from './components';

function App() {
  // UseState
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Carlos')

  const countMore = () => {
    setCount((count) => count + 1);
    setCount((count) => count + 1);
    setCount((count) => count + 1);
  };

  const changeName = () => {
    setName('Ariel')
  }

  return (
    <section id="center">
      <Button label={`Count is ${count}`} parentMethod={countMore} />
      <Button label='Change name' parentMethod={changeName} />
      <p>{name}</p>
    </section>
  );
}

export default App;

// USESTATE
/* class UseState {
  value: any

  get() {
    this.value
  }

  set(nvalue) {
    this.value = nvalue
  }
} */