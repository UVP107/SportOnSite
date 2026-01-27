import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import OrderRejected from "../../components/order-status/order-rejected";
import { getTransactionById } from "@/app/services/transaction-services";
import { TPageProps } from "../../product/[id]/page";

const OrderStatus = async ({ params }: TPageProps) => {
  const { id } = await params;
  const transaction = await getTransactionById(id);
  // const isConfirmed = transaction?.status === "SUCCESS";

  return (
    <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto py-20">
        <h1 className="text-5xl font-bold text-center mb-11">Order Status</h1>
        <div className="grid grid-cols-1 gap-14">
          {transaction.status === "pending" && <OrderSubmitted />}
          {transaction.status === "rejected" && <OrderRejected />}
          {transaction.status === "paid" && <OrderConfirmed />}
        </div>
      </div>
    </main>
  );
};

export default OrderStatus;
