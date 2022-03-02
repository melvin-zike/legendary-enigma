import "./adslist.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {getAds, deleteAd } from "../../context/adContext/apiCalls";

import { AdContext } from "../../context/adContext/AdContext";

export default function AdList() {
  const [data, setData] = useState(productRows);
  const {ads, dispatch} = useContext(AdContext);

  useEffect(() => {
   getAds(dispatch);
  }, [dispatch]);

  const handleRemove = (id) => {
   deleteAd(id, dispatch);
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
        rows={ads}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}