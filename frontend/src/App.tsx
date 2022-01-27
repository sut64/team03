import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";




export default function App() {
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      setRole(localStorage.getItem("role") || "");
    } 
  }, []);

  if (!token) {
    return <SignIn />
  }
 
  return (
    <Router>
      {
        token && (
          <Fragment>
            <Navbar/>
            <Routes>
              
              
            </Routes>
           
          </Fragment>
        )
      }
      
    </Router>
  );
}