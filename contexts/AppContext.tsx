import React from 'react';
import { useState, createContext } from 'react';

type AppContextProviderProps = {
  children: React.ReactNode;
};

type AppContextState = {
  currentUser: CurrentUser,
};

export type CurrentUser = {
  uid: string,
  displayName: string,
  email: string,
}

const defaultState = {
  state: {
    currentUser: {
      uid: '',
      displayName: '',
      email: '',
    },
  },
  setState: (_state: AppContextState) => {},
}

export const AppContext = createContext(defaultState);

export function AppContextProvider ({ children }: AppContextProviderProps) {
  const [state, setState] = useState(defaultState.state);

  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  );
};
