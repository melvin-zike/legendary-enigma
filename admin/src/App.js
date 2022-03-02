import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Transactions from "./pages/transactions/Transactions";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import ListList from "./pages/listList/ListList"
import List from "./pages/list/List";
import NewList from "./pages/newList/NewList";
import NewChallenge from "./pages/newChallenge/NewChallenge";
// import { Movie } from "@material-ui/icons";
// import NewMovie from "./pages/newMovie/NewMovie";

import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
import NewProduct from "./pages/newProduct/NewProduct";
import Ads from "./pages/ads/Ads";
import AdList from "./pages/adsList/AdsList";
import Challenge from "./pages/challenge/Challenge";
import ChallengeList from "./pages/challengeList/ChallengeList";
import { AuthContext } from './context/authContext/AuthContext';
import { useContext } from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
       <Switch>
          <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}  
          </Route>
          {user?.isAdmin && 
          <>
        <Topbar />
      <div className="container">
          <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/movies">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/challenge">
            <Challenge />
          </Route>
          <Route path="/challenge-list">
            <ChallengeList />
          </Route>
          <Route path="/ads">
            <Ads />
          </Route>
          <Route path="/adlist">
            <AdList />
          </Route>
          <Route path="/lists">
            <ListList />
              </Route>
          <Route path="/list/:listId">
                <List />
          </Route>
          <Route path="/newlist">
              <NewList />
            </Route>
          <Route path="/newChallenge">
              <NewChallenge />
            </Route>
      </div></> }
      </Switch>
    </Router>
  );
}

export default App;