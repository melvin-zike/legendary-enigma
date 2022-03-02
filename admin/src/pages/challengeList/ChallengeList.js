import "./challengelist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {getChallenges, deleteChallenge } from "../../context/challengeContext/apiCalls";

import { ChallengeContext } from "../../context/challengeContext/ChallengeContext";

export default function AdList() {
  const [data, setData] = useState(productRows);
  const {challenges, dispatch} = useContext(ChallengeContext);

  useEffect(() => {
   getChallenges(dispatch);
  }, [dispatch]);

  const handleRemove = (id) => {
   deleteChallenge(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "ad",
      headerName: "Ad",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
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
            <span className="productListImg" >{params.row.link} </span>
          </div>
        );
      },
     
  },
    // { field: "limit", headerName: "limit", width: 120 },
    { field: "isChallenge", headerName: "isChallenge", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={{pathname: "/product/" + params.row._id, movie: params.row }}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleRemove(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={challenges}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}