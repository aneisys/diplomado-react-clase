// USE EFFECT
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // Comunicación con un endPoint
  // Maneja el ciclo de vida de un componente

  useEffect(() => {
    // 1. Cuando se monta el componente
    // 2. Cada vez que se modifica uno de los valores del state
    /*
    -------
    */
    return () => {
      // Maneja el estado de la memoria, esto cuando muera el componente
      // Se puede no usar
    };
  }, []); // Arrego de dependencias

  // -------------------------------------------------

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = 'https://dragonball-api.com/api/characters';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener los datos');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Ups. Hay un error</div>;

  return (
    <section id="center">
      <div>{JSON.stringify(data)}</div>
    </section>
  );
}

export default App;

/*
  Comuinicación con un endPoint
  Operaciones async
  Parametros de entrada
  Context
*/
