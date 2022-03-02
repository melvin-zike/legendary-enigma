import "./transactions.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {getTransactions, deleteTransaction } from "../../context/transactionContext/apiCalls";

import { TransactionContext } from "../../context/transactionContext/TransactionContext";

export default function Transactions() {
  const {transactions, dispatch} = useContext(TransactionContext);
  const [isApproved, setIsApproved] = useState(false);
  const [processed, setProcessed] = useState({});
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  //GET TRANSACTIONS
  useEffect(() => {
   getTransactions(dispatch);
  }, [dispatch]);


  //DELETE TRANSACTIONS
  const handleCut = (id) => {
    deleteTransaction(id, dispatch);
   };

//Votes Handler------------------------------------
const handleApprove = async (id, userId, amount, username) => {
  if(id){
    const credent = {
      amount: amount,
      username: username,
    }

    try {
        const res = await axiosInstance.put(`/users/${userId}/approve`, credent, {
 
          headers: {
              token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          }, 
        });
      console.log(res);
      setIsApproved(true);
      
    } catch (err) {
    }
    
  }
   
  };

//process Handler------------------------------------
const handleProcess = async (id) => {
  try {
    const res = await axiosInstance.put(`/transaction/${id}/update`, {status: true}, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
   setProcessed(res.data)
   console.log(res);
  } catch (err) {
   
  }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "UserId",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" alt="" /> */}
            {params.row.userId}
          </div>
        );
      },
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" alt="" /> */}
            NGN{params.row.amount}
          </div>
        );
      },
    },
    // { field: "genre", headerName: "Genre", width: 120 },
    { field: "username", headerName: "username", 
    width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <span className="productListImg" >{params.row.username} </span>
          </div>
        );
      },
     
  },
    // { field: "limit", headerName: "limit", width: 120 },
    { field: "status", headerName: "status", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
          <button className="productListEdit" onClick={() =>handleApprove(params.row._id, params.row.userId, params.row.amount, params.row.username)}>Approve</button>
          <button className="productListEdit" onClick={() =>handleProcess(params.row._id)}>processed</button>
            
           
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleCut(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={transactions}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}