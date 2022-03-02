export const getTransactionsStart = () => ({
    type: "GET_TRANSACTIONS_START",
  });
  
  export const getTransactionsSuccess = (transactions) => ({
    type: "GET_TRANSACTIONS_SUCCESS",
    payload: transactions,
  });
  
  export const getTransactionsFailure = () => ({
    type: "GET_TRANSACTIONS_FAILURE",
  });
  
  export const createTransactionStart = () => ({
    type: "CREATE_TRANSACTION_START",
  });
  
  export const createTransactionSuccess = (transaction) => ({
    type: "CREATE_TRANSACTION_SUCCESS",
    payload: transaction,
  });
  
  export const createTransactionFailure = () => ({
    type: "CREATE_TRANSACTION_FAILURE",
  });
  
  export const updateTransactionStart = () => ({
    type: "UPDATE_TRANSACTION_START",
  });
  
  export const updateTransactionSuccess = (transaction) => ({
    type: "UPDATE_TRANSACTION_SUCCESS",
    payload: transaction,
  });
  
  export const updateTransactionFailure = () => ({
    type: "UPDATE_TRANSACTION_FAILURE",
  });
  
  export const deleteTransactionStart = () => ({
    type: "DELETE_TRANSACTION_START",
  });
  
  export const deleteTransactionSuccess = (id) => ({
    type: "DELETE_TRANSACTION_SUCCESS",
    payload: id,
  });
  
  export const deleteTransactionFailure = () => ({
    type: "DELETE_TRANSACTION_FAILURE",
  });