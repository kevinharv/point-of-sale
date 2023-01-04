import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import ProfileManager from "./pages/configuration/ProfileManager";
import BarTab from './pages/order_management/BarTab';
import TableTab from './pages/order_management/TableTab';
import ManagerScreen from './pages/configuration/manager_screen/ManagerScreen';
import AllTabs from './pages/order_management/AllTabs';
import OpenTickets from './pages/order_management/OpenTickets';

function App() {

  /*
    APP LOAD ACTIONS:
    - Check for server configuration
      - Engage first time setup if not present
    - Reach out to server
      - Pull latest device/tenant config
    - Run device/OS checks
  */



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<ProfileManager />} />

            <Route path="management" element={<ManagerScreen />}>
              {/* <Route path="orders" element={<OrderManagement />} /> */}
            </Route>

            <Route path="sales" element={<Outlet />}>
              <Route path="bar-tab" element={<BarTab />} />
              <Route path="table-tab" element={<TableTab />} />
              <Route path="all-tabs" element={<AllTabs />} />
              <Route path="open-tabs" element={<OpenTickets />} />
            </Route>


            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
