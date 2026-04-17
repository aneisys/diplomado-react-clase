import { type ReactNode, useState } from 'react';
import { GlobalContext } from './global.context';

interface Props {
  children: ReactNode;
}
//3 El provider
export const GlobalProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);

  const logout = () => setUser(null);

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};
