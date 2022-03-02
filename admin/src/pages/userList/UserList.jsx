import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {getUsers, deleteUser } from "../../context/userContext/apiCalls";

import { UserContext } from "../../context/userContext/UserContext";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const {users, dispatch} = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch);
   }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            
            {params.row.state}
          </div>
        );
      },
    },
    {
      field: "subscription",
      headerName: "Subscription Package",
      width: 200,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            
            {params.row.accountNumber}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
          <Link to={{pathname: "/user/" + params.row._id, user: params.row }}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        // disableSelectionOnClick
        columns={columns}
        pageSize={20}
        // checkboxSelection
        getRowId={r=>r._id}
      />
    </div>
  );
}
