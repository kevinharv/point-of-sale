import { useEffect, useState } from "react";
import "./App.css";
import OrderCard from "./components/OrderCard";
import { layoutConfig } from "./config/layout";

const cols = layoutConfig.kdsCols;
const rows = layoutConfig.kdsRows;

export default function App() {
  const [orderIDs, setOrderIDs] = useState([]);

  useEffect(() => {
    const numOrders = Math.floor(Math.random() * 10);
    const newOrderIDs = [];
    for (let i = 0; i < numOrders; i++) {
      newOrderIDs.push(Math.random() * 10000);
    }
    setOrderIDs((prev) => [...prev, ...newOrderIDs]);
  }, []);

  const handleOrderRemove = (orderToRemove) => {
    setOrderIDs((prev) => prev.filter((orderID) => orderID !== orderToRemove));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 flex-1 overflow-y-auto overflow-x-hidden">
        {orderIDs.map((order) => (
          <li
            className="list-none mb-4 break-inside-avoid w-full"
            key={`order:${order}`}
            onDoubleClick={() => handleOrderRemove(order)}
          >
            <OrderCard id={order} key={`orderCard:${order}`} />
          </li>
        ))}
      </div>

      <div className="w-full bg-slate-700 p-2 shrink-0 flex justify-between">
        <h1 className="text-white px-4">Me</h1>
        <h1 className="text-white px-4">{Date.now()}</h1>
      </div>
    </div>
  );
}
