import {  useState, useContext, useEffect, useCallback, useReducer } from 'react';
import { Context } from '../context';

export default function ToDoList() {

  type State = {
    list: string[];
    inputItem: string;
  };

  const initialState: State = { list: [], inputItem: '' };

  type Action = { type: 'ADD_TO_LIST' } | { type: 'DELETE_FROM_LIST' } | { type: 'CHANGE_INPUT_ITEM', data: string };

  const reducer = (state: State, action: Action) => {
    switch(action.type) {
      case 'ADD_TO_LIST':
        return {
          ...state,
          list: [
            ...state.list,
            state.inputItem
          ],
          inputItem: ''
        }
      case 'CHANGE_INPUT_ITEM': {
        return {
          ...state,
          inputItem: action.data
        }
      }
      default:
        return state;
    }
  };
  const context = useContext(Context);
  const [isLoggedText, setIsLoggedText] = useState<boolean>(false);
  const [listState, dispatch] = useReducer(reducer, initialState);
  const listOfItems = listState.list?.map((item: string) => <div key={item}>{item}</div>);

  const changeLogInPhase = useCallback((): void => {
    setIsLoggedText(!isLoggedText);
  }, [isLoggedText, setIsLoggedText]);
  
  const handleAddItem = (): void => {
    dispatch({ type: 'ADD_TO_LIST' });
  };

  const onChangeInputItem = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'CHANGE_INPUT_ITEM', data: event.target.value});
  };

  useEffect(() => {
    context?.subscribable.subscribe(changeLogInPhase);
    return () => {
      context?.subscribable.unsubscribe(changeLogInPhase);
    }
  }, [context, changeLogInPhase]);

  return (
    <div>
      <input type='text' placeholder='type here' value={listState.inputItem} onChange={onChangeInputItem}/>
      <button onClick={handleAddItem}>Add</button>
      <div>
        {listOfItems}
      </div>
        {isLoggedText ? "You're logged in" : "You're not logged in"}
    </div>
  )
}