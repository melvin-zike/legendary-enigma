import AdReducer from "./AdReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  ads: [],
  isFetching: false,
  error: false,
};

export const AdContext = createContext(INITIAL_STATE);

export const AdContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AdReducer, INITIAL_STATE);

  return (
    <AdContext.Provider
      value={{
        ads: state.ads,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};