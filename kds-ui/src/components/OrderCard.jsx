/*
    Take ID prop only - fetch data from server at component level
*/

import { useState, useEffect } from "react";
import { generateOrder } from "../tests/orderGenerator";
import { orderConfig } from "../config/orders";

export default function OrderCard(props) {
  const testOrder = generateOrder(props.id);

  const [ticketNumber] = useState(testOrder.ticketNumber);
  const [submittedBy] = useState(testOrder.submittedBy);
  const [submissionTime] = useState(testOrder.submissionTime);
  const [orderItems] = useState(testOrder.orderItems);

  const [elapsedTime, setElapsedTime] = useState(() => {
    return Math.floor((Date.now() - submissionTime) / 1000);
  });

  // Update elapsed time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - submissionTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [submissionTime]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col border-1 rounded-sm border-white min-h-3/4 bg-gray-800 w-full">
      <ol className="p-3 flex-1">
        {orderItems.map((orderItem) => (
          <li key={orderItem.name}>
            {orderItem.name}
            <ul className="ml-4">
              {orderItem.sub.map((sub) => (
                <li key={`${orderItem.id}:${sub}`}>{sub}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="w-full mt-2 shrink-0 bg-gray-700 text-center flex justify-between px-2 py-1">
        <p>{ticketNumber}</p>
        <p>{submittedBy}</p>
        <p
          className={
            (elapsedTime > orderConfig.badTime && "bg-red-700") ||
            (elapsedTime > orderConfig.warnTime && "bg-yellow-700")
          }
        >
          {formatTime(elapsedTime)}
        </p>
      </div>
    </div>
  );
}
