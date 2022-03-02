import ChallengeReducer from "./ChallengeReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  challenges: [],
  isFetching: false,
  error: false,
};

export const ChallengeContext = createContext(INITIAL_STATE);

export const ChallengeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChallengeReducer, INITIAL_STATE);

  return (
    <ChallengeContext.Provider
      value={{
        challenges: state.challenges,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};