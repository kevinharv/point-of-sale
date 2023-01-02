import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import ProfileManager from "./pages/configuration/ProfileManager";

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
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
