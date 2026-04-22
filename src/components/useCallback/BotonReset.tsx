import { memo } from 'react';

interface Props {
  onReset: () => void;
}

// React.memo le dice a React: "No vuelvas a dibujar este botón"
// a menos que la prop onReset sea diferente a la anterior

// export const BotonReset = ({ onReset }: Props) => {
//   console.log('Hijo (Boton reset) Renderizado');

//   return (
//     <button onClick={onReset} style={{ marginTop: '10px' }}>
//       Reiniciar la lista
//     </button>
//   );
// };

export const BotonReset = memo(({ onReset }: Props) => {
  console.log('Hijo (Boton reset) Renderizado');

  return (
    <button onClick={onReset} style={{ marginTop: '10px' }}>
      Reiniciar la lista
    </button>
  );
});
