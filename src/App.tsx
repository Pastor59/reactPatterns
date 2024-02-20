import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { Context } from './context';
import NavBar from './navbar';
import ToDoList from './list';
import { Subscribable } from './patterns/subscribe';

function App() {
  const subscribable = new Subscribable();
  return (
    <Context.Provider value={{subscribable}}>
      <NavBar />
      <ToDoList />
    </Context.Provider>
  )
}


export default App
