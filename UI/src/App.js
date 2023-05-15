// import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import React from "react";

import Login from "./Commponents/Login";
//admin
import Admin from "./pages/Admin/Dashboard";
import Dokumen_admin from "./pages/Admin/Dokumen";

//Customer
import Customer from "./pages/Customer/Dashboard";
import Dokumen_customer from "./pages/Customer/Dokumen";

const App = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route path="/admin/dashboard" element={<Admin />} />
    <Route path="/admin/dokumen" element={<Dokumen_admin />} />

    <Route path="/customer/dashboard" element={<Customer/>} />
    <Route path="/customer/dokumen" element={<Dokumen_customer />} />
  </Routes>
);
export default App;
