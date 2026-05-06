// Context
/*
 Es unidireccional
*/

// Forma simple pero no correcta
import './App.css';
import { NavBar } from './components';
// import { GlobalTodoProvider } from './context';
import { GlobalProvider } from './context/global.provider';

/*interface GlobalContextType {
  user: string | null;
  login: (name: string) => void;
  logout: () => void;
}

export const globalContext = createContext<GlobalContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

function App() {
  const [user, setUser] = useState<string | null>(null);

  const login = (name: string) => setUser(name);

  const logout = () => setUser(null);

  return (
    <globalContext.Provider value={{ user, login, logout }}>
      <NavBar />
    </globalContext.Provider>
  );
}*/

// Forma correcta 1 (no es la completa)
/*
function App() {
  return (
    <GlobalTodoProvider>
      <NavBar />
    </GlobalTodoProvider>
  );
}
*/

// Forma correcta 2
function App() {
  return (
    <GlobalProvider>
      <NavBar />
    </GlobalProvider>
  );
}

export default App;
