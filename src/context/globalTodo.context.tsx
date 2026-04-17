import { createContext, useContext, useState, type ReactNode } from 'react';

// 1 Definimos la interfaz
interface GlobalTodoContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

//2 Definir el contexto
export const GlobalContext = createContext<GlobalTodoContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

//3 El provider
export const GlobalTodoProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);

  const logout = () => setUser(null);

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

//4 El hook
export const useGlobalTodoContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      'useGlobalTodoContext debe usarse dentro de un GlobalProvider',
    );
  return context;
};
