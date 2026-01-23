"use client";

import OrderSubmitted from "../../components/order-status/order-submitted";
import OrderConfirmed from "../../components/order-status/order-confirmed";
import { useState } from "react";

const OrderStatus = () => {
  const [isConfirmed] = useState(false);
  return (
    <main className="bg-gray-100 min-h-[80vh] lg:pt-8">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        <div className="grid grid-cols-1 gap-14">
          {isConfirmed ? <OrderConfirmed /> : <OrderSubmitted />}
        </div>
      </div>
    </main>
  );
};

export default OrderStatus;
