import { getAllBanks } from "@/app/services/bank-services";
import CardWithHeader from "../ui/card-with-header";
import { FiCreditCard } from "react-icons/fi";

const PaymentOptions = async () => {
  const banks = await getAllBanks();
  return (
    <CardWithHeader title="Payment Options">
      {banks.map((payment, index) => (
        <div key={index} className="flex gap-5 p-5 border-b border-gray-100">
          <div className="bg-blue-100 text-blue-500 p-4 h-fit self-center">
            <FiCreditCard size={24} />
          </div>
          <div className="self-center">
            <div className="font-bold">{payment.bankName}</div>
            <div className="text-sm">{payment.accountNumber}</div>
            <div className="text-sm opacity-70">{payment.accountName}</div>
          </div>
          <div className="ml-auto bg-blue-50 text-gray-800 text-xs h-fit self-center px-2 py-1">
            Bank Transfer
          </div>
        </div>
      ))}
    </CardWithHeader>
  );
};

export default PaymentOptions;
