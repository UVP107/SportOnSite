import CardWithHeader from "../ui/card-with-header";
import { FiCreditCard } from "react-icons/fi";

const paymentList = [
  {
    bank_name: "BRI",
    account_number: "1234567890",
    account_holder: "PT SportsOn BRI",
  },
  {
    bank_name: "BCA",
    account_number: "9087654321",
    account_holder: "PT SportsOn BCA",
  },
  {
    bank_name: "Mandiri",
    account_number: "1029384756",
    account_holder: "PT SportsOn Mandiri",
  },
];

const PaymentOptions = () => {
  return (
    <CardWithHeader title="Payment Options">
      {paymentList.map((payment, index) => (
        <div key={index} className="flex gap-5 p-5 border-b border-gray-100">
          <div className="bg-blue-100 text-blue-500 p-4 h-fit self-center">
            <FiCreditCard size={24} />
          </div>
          <div className="self-center">
            <div className="font-bold">{payment.bank_name}</div>
            <div className="text-sm">{payment.account_number}</div>
            <div className="text-sm opacity-70">{payment.account_holder}</div>
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
