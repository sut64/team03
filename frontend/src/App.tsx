import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import NavbarMember from "./components/NavbarMember";
import CreateFacility from "./components/CreateFacility";
import HistoryFacility from "./components/HistotyFacility";

import CreateEvent from "./components/CreateEvent";
import HistoryEvent from "./components/HistoryEvent";

import BorrowingCreate from "./components/BorrowingCreate";
import Borrowing from "./components/Borrowing";
import BorrowingforMember from "./components/BorrowingforMember";

import Welcome from "./components/Welcome";
import WelcomeMember from "./components/WelcomeMember";
import { UserInterface, UserloginInterface, RoleloginInterface } from "./model/UserUI";

import InputEquipment from './components/InputEquipment';
import Equipment from "./components/Equipment";
import UserEquipment from "./components/UserEquipment";

import PaymentCreate from "./components/PaymentCreate";
import HistoryPayment from "./components/HistoryPayment";
import PaymentforMember from "./components/PaymentforMember";

import CreateReserve from "./components/Reserve";
import HistoryReserve from "./components/HistoryReserve";
import HistoryFacilityForMember from "./components/HistoryFacilityForMember";
import ReserveAdmin from "./components/ReserveAdmin";



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
            

              {role === "admin" && user?.Role.Name === role && ( <>
                <Navbar/>
            <Routes>
              <Route path="/" element={<Welcome />} /> 
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
              <Route path="/HistoryReserve" element={<HistoryReserve />} />
              <Route path="/ReserveAdmin" element={<ReserveAdmin />} />
              
              </Routes>

              </>
              )}

              {role === "member" && user?.Role.Name === role && ( <>

                <NavbarMember/>
            <Routes>
              <Route path="/" element={<WelcomeMember />} /> 
              <Route path="/HistoryFacilityForMember" element={<HistoryFacilityForMember />} />
              <Route path="/CreateReserve" element={<CreateReserve />} />
              <Route path="/HistoryReserve" element={<HistoryReserve />} />
              <Route path="/HistoryEvent" element={<HistoryEvent/>} />
              <Route path="/BorrowingforMember" element={<BorrowingforMember/>} /> 
              <Route path="/UserEquipment" element={<UserEquipment/>} /> 
              <Route path="/PaymentforMember" element={<PaymentforMember />} />
              </Routes>
              </>
              )}
              
                   
          </Fragment>
        )
      }
      
    </Router>
    
  );
  
}