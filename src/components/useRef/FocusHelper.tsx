import { useEffect, useRef } from 'react';

export const FocusHelper = () => {
  // 1 Referencia para un elemento del DOM (Especificamos el tipo de HTMLInpuElement)
  const inputRef = useRef<HTMLInputElement>(null);

  // 2 Referencia para un valor de persistencia no visual
  const clicCount = useRef<number>(0);

  const hanldeFocus = () => {
    inputRef.current.focus();

    // Actualizar el valor sin disparar el render
    clicCount.current += 1;
    console.log(`Botón presionado ${clicCount.current} veces`);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <input
        ref={inputRef} // Conectamos la "Caja" con el elemento real
        type="text"
        placeholder="Escribe algo..."
      />
      <button onClick={hanldeFocus}>Enfocar input</button>
      <p>Revisar la consola para ver el contador "Silencioso"</p>
    </div>
  );
};
