// Ver si es necesario memorizar el cálculo

import { useCallback, useMemo, useState } from 'react';
import { BotonReset } from '../useCallback/BotonReset';

export const Calculo = () => {
  const [numeros, setNumeros] = useState<number[]>([1, 2, 3, 4, 5]);
  const [show, setShow] = useState(true);

  /*
  const calculo = () => {
    console.log('Calculando...');
    // Simular un cálculo costoso
    for (let i = 0; i < 1_000_000; i++) {}
    return numeros.reduce((a, b) => a * b);
  };
  */

  const calculoMemo = useMemo(() => {
    console.log('Calculando...');
    // Simular un cálculo costoso
    for (let i = 0; i < 1_000_000; i++) { /* empty */ }
    return numeros.reduce((a, b) => a * b);
  }, [numeros]);

  const agregarNumero = () => {
    setNumeros([...numeros, numeros[numeros.length - 1] + 1]);
  };

  // const reiniciar = () => {
  //   setNumeros([1, 2, 3, 4, 5]);
  // }

  const reiniciar = useCallback(() => {
    setNumeros([1, 2, 3, 4, 5]);
  }, []);

  return (
    <>
      <h2>Cálculo memorizado</h2>
      {/* <p>Resultado: {calculo()}</p> */}
      <p>Resultado: {calculoMemo}</p>

      <button onClick={() => setShow(!show)}>
        {show ? 'Ocultar' : 'Mostrar'}
      </button>
      <button onClick={agregarNumero}>Agregar número</button>
      <BotonReset onReset={reiniciar} />
    </>
  );
};
