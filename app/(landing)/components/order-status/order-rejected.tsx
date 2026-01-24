import {FiAlertOctagon} from "react-icons/fi";

const OrderRejected = () => {
  return (
    <main className="bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl overflow-hidden">
        <div className="p-10 md:p-16 flex flex-col items-center text-center">
            <div className="w-32 h-32 mb-8 bg-primary-light rounded-full mx-auto p-3 flex justify-center items-center text-primary">
                <FiAlertOctagon size={64} color="red"/>
            </div>

          <h2 className="font-bold text-3xl mb-4 text-gray-900">
            Order Rejected!!
          </h2>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            I&apos;m sorry your order is rejected because your payment proof is not
            valid, please try again with another payment method.
          </p>
        </div>
      </div>
    </main>
  );
};

export default OrderRejected;
