const TransactionReducer = (state, action) => {
    switch (action.type) {
      case "GET_TRANSACTIONS_START":
        return {
          transactions: [],
          isFetching: true,
          error: false,
        };
      case "GET_TRANSACTIONS_SUCCESS":
        return {
          transactions: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_TRANSACTIONS_FAILURE":
        return {
          transactions: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_TRANSACTION_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_TRANSACTION_SUCCESS":
        return {
          transactions: [...state.transactions, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_TRANSACTION_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPLOAD_TRANSACTION_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPLOAD_TRANSACTION_SUCCESS":
        return {
          transactions: state.transactions.map(
            (transaction) => transaction._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPLOAD_TRANSACTION_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_TRANSACTION_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_TRANSACTION_SUCCESS":
        return {
          transactions: state.transactions.filter((transaction) => transaction._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_TRANSACTION_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default TransactionReducer;