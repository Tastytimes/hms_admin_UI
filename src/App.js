// import { Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import PageLoadingRouting from "./PageLoadingRouting";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Col, Row } from "react-bootstrap";
import Routing from "./Routing";
import { login, logout } from "./store/Auth-slice";

function App() {
  const [isAuth, setIsAuth] = useState(null);

  const dispatch = useDispatch();
  const authInfo = useSelector((store) => store.auth);
  console.log("apppp", authInfo);

  useEffect(() => {
    const adminToken = JSON.parse(localStorage.getItem("loginInfo"));
    const firstTimeLogin = JSON.parse(localStorage.getItem("isFirstTimeLogin"));
    if (adminToken) {
      const obj = {
        email: adminToken.email,
        role: adminToken.role,
      };
      if (firstTimeLogin) {
        dispatch(login(obj));
        // login(obj);

        setIsAuth(false);
      } else {
        dispatch(login(obj));
        setIsAuth(true);
      }
    } else {
      // dispatch(logout());
      setIsAuth(false);
    }
  }, [authInfo]);

  const routing = () => {
    if (isAuth) {
      return (
        <>
          <div className="container bg-zinc-100 my-1">
            <Row>
              <Col md={3} className="my-4">
                <Navbar />
              </Col>
              <Col md={9}>
                <Routing />
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="background-img">
            <PageLoadingRouting />
          </div>
        </>
      );
    }
  };
  return (
    <div>
      <Router>{routing()}</Router>
    </div>
  );
}

export default App;
