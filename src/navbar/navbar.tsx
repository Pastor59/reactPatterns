import { useContext, useState, useEffect, useCallback } from 'react';
import { Context } from '../context';

function NavBar() {
  const context = useContext(Context);
  const [isLogged, setIsLogged] = useState(false);
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    context?.subscribable.publish();
  };
  const changeLogInState = useCallback((): void => {
    setIsLogged(!isLogged);
  }, [isLogged, setIsLogged]);

   useEffect(() => {
     context?.subscribable.subscribe(changeLogInState);
     return () => {
       context?.subscribable.unsubscribe(changeLogInState);
   }
  }, [context, changeLogInState]);
  
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a onClick={handleClick} className="waves-effect waves-light btn">{isLogged ? "log out" : "log in"}</a></li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default NavBar;