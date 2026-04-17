import { createContext, useContext } from 'react';

// 1 Definimos la interfaz
interface GlobalContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

//2 Definir el contexto
export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

//4 El hook
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      'useGlobalTodoContext debe usarse dentro de un GlobalProvider',
    );
  return context;
};
