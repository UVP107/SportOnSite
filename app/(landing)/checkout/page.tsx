"use client";
import OrderInformation from "../components/checkout/order-information";
import CartItems from "../components/checkout/cart-items";
import { useState } from "react";
import { CustomerInfo, useCartStore } from "@/app/hooks/use-cart-store";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { setCustomerInfo } = useCartStore();
  const { push } = useRouter();
  const [formData, setFormData] = useState<CustomerInfo>({
    customerName: "",
    customerContact: null,
    customerAddress: "",
  });
  const handlePayment = () => {
    if (
      !formData.customerName ||
      !formData.customerAddress ||
      !formData.customerContact
    ) {
      alert("Please fill out all fields");
      return;
    }
    setCustomerInfo(formData);
    push("/payment");
  };

  return (
    <main className="bg-gray-100 min-h-[80vh] lg:pt-8">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Checkout Now</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 h-150">
          <OrderInformation formData={formData} setFormData={setFormData} />
          <CartItems handlePayment={handlePayment} />
        </div>
      </div>
    </main>
  );
};

export default Checkout;
