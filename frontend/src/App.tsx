import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import CreateFacility from "./components/CreateFacility";
import HistoryFacility from "./components/HistotyFacility";

import CreateEvent from "./components/CreateEvent";
import HistoryEvent from "./components/HistoryEvent";

import BorrowingCreate from "./components/BorrowingCreate";
import Borrowing from "./components/Borrowing";

import Welcome from "./components/Welcome";
import { UserInterface, UserloginInterface, RoleloginInterface } from "./model/UserUI";
import { json } from "stream/consumers";

import InputEquipment from './components/InputEquipment';
import Equipment from "./components/Equipment";

import PaymentCreate from "./components/PaymentCreate";
import HistoryPayment from "./components/HistoryPayment";


export default function App() {
  const [token, setToken] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [user, setuser] = useState<UserInterface>();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      setToken(getToken);
      setuser(JSON.parse(localStorage.getItem("User")|| ""))
      setRole(localStorage.getItem("Role") || "");
    } 
  }, []);
  console.log(user?.Role.Name);

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
              <Route path="/" element={<Welcome />} />

              {role === "admin" && user?.Role.Name === role && ( <>
              <Route path="/CreateFacility" element={<CreateFacility />} />
              <Route path="/HistoryFacility" element={<HistoryFacility />} />
              <Route path="/CreateEvent" element={<CreateEvent/>} />
              <Route path="/HistoryEvent" element={<HistoryEvent/>} />
              <Route path="/BorrowingCreate" element={<BorrowingCreate/>} />
              <Route path="/Borrowing" element={<Borrowing/>} />
              <Route path="/equip" element={<Equipment />} />
              <Route path="/inputEquip" element={<InputEquipment/>} />
              <Route path="/HistoryPayment" element={<HistoryPayment />} />
              <Route path="/PaymentCreate" element={<PaymentCreate />} />

              </>
              )}

              {role === "member" && user?.Role.Name === role && ( <>
              <Route path="/HistoryFacility" element={<HistoryFacility />} />
              </>
              )}
              
              
              
              
              

            </Routes>
           
          </Fragment>
        )
      }
      
    </Router>
    
  );
  
}