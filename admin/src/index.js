import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from "./context/authContext/AuthContext";
import { ListContextProvider } from './context/listContext/ListContext';
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { AdContextProvider } from "./context/adContext/AdContext";
import { ChallengeContextProvider } from "./context/challengeContext/ChallengeContext";
import { UserContextProvider } from "./context/userContext/UserContext";
import { TransactionContextProvider } from "./context/transactionContext/TransactionContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdContextProvider>
     <MovieContextProvider>
       <ListContextProvider>
       <ChallengeContextProvider>
       <TransactionContextProvider>
       <UserContextProvider>
    <App />
    </UserContextProvider>
    </TransactionContextProvider>
    </ChallengeContextProvider>
    </ListContextProvider>
     </MovieContextProvider>
     </AdContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

