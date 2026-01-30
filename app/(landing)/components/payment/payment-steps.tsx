"use client";

import { FiCheckCircle } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import Button from "../ui/button";
import priceFormatter from "@/app/(landing)/utils/price-formatter";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { transactionCheckout } from "@/app/services/transaction-services";
import { toast } from "react-toastify";

const PaymentSteps = () => {
  const { push } = useRouter();
  const { items, customerInfo, reset } = useCartStore();
  const [file, setFile] = useState<File | null>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  useEffect(() => {
    let isRedirecting = false;

    if (items.length === 0 && !isRedirecting) {
      isRedirecting = true;
      toast.info("Cart is empty!");
      const timer = setTimeout(() => push("/"), 2000);
      return () => clearTimeout(timer);
    }
  }, [items.length, push]);

  const handleConfirmPayment = async () => {
    if (items.length === 0) {
      toast.error("Cannot process an empty order.");
      return;
    }

    if (!file) {
      toast.warn("Please upload your payment receipt!");
      return;
    }

    if (!customerInfo) {
      toast.error("Customer information missing!");
      push("/checkout");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("customerName", customerInfo.customerName);
      formData.append(
        "customerContact",
        customerInfo.customerContact!.toString(),
      );
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append("image", file);
      formData.append("totalPayment", totalPrice.toString());

      formData.append(
        "items",
        JSON.stringify(
          items.map((item) => ({ productId: item._id, qty: item.qty })),
        ),
      );

      const res = await transactionCheckout(formData);
      toast.success("Transaction created successfully!");
      reset();
      push(`/order-status/${res._id}`);
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to process transaction.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-5">
          <li>
            Transfer <b>{priceFormatter(totalPrice)}</b> to our bank accounts.
          </li>
          <li>Keep the receipt or screenshot.</li>
          <li>Upload it below to confirm your order.</li>
        </ol>
        <FileUpload onFileSelect={setFile} />
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between font-semibold">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button
          variant="dark"
          className="w-full mt-4"
          onClick={handleConfirmPayment}
          disabled={isSubmitting || items.length === 0} // Button stays disabled if empty
        >
          <FiCheckCircle size={22} />
          {isSubmitting ? "Processing..." : "Upload Receipt & Confirm"}
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;
