import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import config from "./config/tenant.json";
import Login from "./components/Login";
import Home from "./pages/Home";

function App() {

  return (
    <>
      <Home />
    </>
  );
}

export default App;
