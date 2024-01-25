import {  useState, useContext, useEffect, useCallback } from 'react';
import { Context } from '../context';

export default function ToDoList() {
  const context = useContext(Context);
  const [isLoggedText, setIsLoggedText] = useState(false);

  const changeLogInPhase = useCallback((): void => {
    setIsLoggedText(!isLoggedText);
  }, [isLoggedText, setIsLoggedText]);

  useEffect(() => {
    context?.subscribable.subscribe(changeLogInPhase);
    return () => {
      context?.subscribable.unsubscribe(changeLogInPhase);
    }
  }, [context, changeLogInPhase]);

  return (
      <div>
          {isLoggedText ? "You're logged in" : "You're not logged in"}
      </div>
  )
}