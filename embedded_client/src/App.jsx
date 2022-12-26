import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import config from "./config/tenant.json";
import Login from "./components/Login";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <div className="logoTitle">
        <h1>{config.name}</h1>
      </div>

      <div className="authSection">
        <Login />
      </div>
    </div>
  );
}

export default App;
