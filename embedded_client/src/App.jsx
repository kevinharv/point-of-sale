import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import "./App.css";
import Login from "./components/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
