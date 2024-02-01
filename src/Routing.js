import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardOverview from "./pages/DashboardOverview";
import Users from "./pages/Users/Users";
import Features from "./pages/Features/Features";
import Subscriptions from "./pages/Subscriptions/Subscriptions";

const Routing = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardOverview />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/features" element={<Features />}></Route>
      <Route path="/subscription" element={<Subscriptions />}></Route>
    </Routes>
  );
};

export default Routing;
