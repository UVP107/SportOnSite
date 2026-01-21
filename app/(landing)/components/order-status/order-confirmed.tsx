import Image from "next/image";

const OrderConfirmed = () => {
  return (
    <main className="bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* <h1 className="text-5xl font-bold text-center mb-12">Order Status</h1> */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-2xl overflow-hidden">
        <div className="p-10 md:p-16 flex flex-col items-center text-center">
          <div className="mb-8">
            <Image
              src="/images/icon-order-confirmed.svg"
              alt="submitted"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          <h2 className="font-bold text-3xl mb-4 text-gray-900">
            Order Confirmed!!
          </h2>

          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            We have received your payment, and your order is currently processed
            by our staff, just wait until your favorite sportswear arrive in
            your home. We will contact you in Whatsapp for further shipping
            updates..
          </p>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmed;
