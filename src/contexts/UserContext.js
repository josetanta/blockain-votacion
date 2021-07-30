import { createContext, useContext, useReducer, useState } from 'react';
import { saveVoted } from '../utils/sessionStorage';
import { initStateUser, votarReducer } from './reducers/userReducer';

const userContext = createContext({});
userContext.displayName = 'User';

export function UserProvider(props) {
  const [state, dispatch] = useReducer(votarReducer, initStateUser);
  const [isVoted, setIsVoted] = useState(false);
  const handleVotar = () => {
    dispatch({ type: 'votar' });
    window
      .isVoted(state.token)
      .then((voted) => {
        setIsVoted(voted);
        saveVoted(voted);
        console.log(voted);
      })
      .catch((err) => console.log(err));
  };

  return (
    <userContext.Provider
      value={{
        handleVotar,
        state,
        isVoted,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}
