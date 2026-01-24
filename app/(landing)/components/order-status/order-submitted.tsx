"use client";
import Image from "next/image";
import Button from "../ui/button";
import { FiRefreshCw } from "react-icons/fi";

const OrderSubmitted = () => {
  const reloadOrderStatus = () => {
    window.location.reload();
  };

  return (
    <main className="bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl overflow-hidden mx-auto">
        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/images/icon-order-submitted.svg"
              alt="submitted"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <h2 className="font-bold text-3xl mb-4 text-gray-900">
            Order Submitted!!
          </h2>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            Your Order is recorded in our system, we are still confirming the
            payment status, please wait and your order status will be updated in
            less than 12 hours.
          </p>

          <Button
            variant="dark"
            className="w-full flex items-center justify-center gap-3 py-4 text-lg"
            onClick={reloadOrderStatus}
          >
            <FiRefreshCw />
            Refresh Order Status
          </Button>
        </div>
      </div>
    </main>
  );
};

export default OrderSubmitted;
