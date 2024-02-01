import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import UpdatePassword from "./pages/UpdatePassword";

const PageLoadingRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/reset-password" element={<ResetPassword />}></Route>
      <Route path="/update-password" element={<UpdatePassword />}></Route>
    </Routes>
  );
};

export default PageLoadingRouting;
