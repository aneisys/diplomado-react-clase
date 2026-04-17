//import { useContext } from 'react';
//import { globalContext } from '../../App';
import { useGlobalTodoContext } from '../../context';
import { useGlobalContext } from '../../context/global.context';

// Forma simple pero no correcta
/*
export const NavBar = () => {
  const { login, logout, user } = useContext(globalContext);

  return (
    <div>
      <h1>NavBar</h1>
      <h2>{user}</h2>
      <button onClick={() => login('Carlos')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
*/

export const NavBar = () => {
  // Forma  correcta 1
  //const { login, logout, user } = useGlobalTodoContext();

  // Forma correcta 2
  const { login, logout, user } = useGlobalContext();

  return (
    <div>
      <h1>NavBar Forma correcta 2</h1>
      <h2>{user}</h2>
      <button onClick={() => login('Carlos')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
