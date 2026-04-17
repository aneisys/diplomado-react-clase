// CUSTOM HOOK
import './App.css';
import { useFetch } from './hooks';
import type { CustomHook } from './interfaces';

const url = 'https://dragonball-api.com/api/characters/1';

function App() {
  const { data, error, loading } = useFetch<CustomHook>(url);

  if (error) return <div>Ups. hay un error</div>;
  if (loading) return <div>Cargando...</div>;
  return (
    <section id="center">
      <div>{JSON.stringify(data)}</div>
    </section>
  );
}

export default App;
