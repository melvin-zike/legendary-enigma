import axios from "axios";
import {
  createTransactionFailure,
  createTransactionStart,
  createTransactionSuccess,
  deleteTransactionFailure,
  deleteTransactionStart,
  deleteTransactionSuccess,
  getTransactionsFailure,
  getTransactionsStart,
  getTransactionsSuccess,
} from "./TransactionActions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getTransactions = async (dispatch) => {
  dispatch(getTransactionsStart());
  try {
    const res = await axiosInstance.get("/transaction", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getTransactionsSuccess(res.data));
  } catch (err) {
    dispatch(getTransactionsFailure());
  }
};

//create
export const createTransaction = async (transaction, dispatch) => {
  dispatch(createTransactionStart());
  try {
    const res = await axiosInstance.post("/transaction", transaction, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createTransactionSuccess(res.data));
  } catch (err) {
    dispatch(createTransactionFailure());
  }
};

//delete
export const deleteTransaction = async (id, dispatch) => {
  dispatch(deleteTransactionStart());
  try {
    await axiosInstance.delete("/transaction/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteTransactionSuccess(id));
  } catch (err) {
    dispatch(deleteTransactionFailure());
  }
};