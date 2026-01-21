"use client";

import Image from "next/image";
import priceFormatter from "../../utils/price-formatter";
import Button from "../ui/button";
import { FiArrowRight, FiCreditCard, FiTrash2 } from "react-icons/fi";
import { cartList, totalPrice } from "../ui/cart-popup";
import CardWithHeader from "../ui/card-with-header";
import { useRouter } from "next/navigation";

const CartItems = () => {
  const payment = () => {};

  const { push } = useRouter();

  return (
    <CardWithHeader title="Cart Items">
      <div className="bg-white">
        {/* <div className="px-5 py-4 border-b border-gray-200"> */}
        {/* <h2 className="font-bold text-lg">Cart Items</h2> */}
      </div>
      <div className="overflow-auto max-h-75">
        {cartList.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 p-4 flex gap-3 key={index}"
          >
            <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
              <Image
                src={`/images/products/${item.imgUrl}`}
                alt={item.name}
                width={63}
                height={63}
                className="aspect-square object-contain"
              />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div className="self-center">
                <div className="text-sm font-medium">{item.name}</div>
                <div className="flex gap-3  font-medium text-xs">
                  <div>{item.qty}x</div>
                  <div className="font-medium text-primary">
                    {priceFormatter(item.price)}
                  </div>
                </div>
              </div>
              <Button
                size="small"
                variant="ghost"
                className="w-7 h-7 p-0! self-center ml-auto"
              >
                <FiTrash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button
          size="small"
          variant="dark"
          className="w-full mt-4"
          onClick={() => push("/payment")}
        >
          <FiCreditCard /> Proceed to Payment <FiArrowRight />
        </Button>
      </div>
      {/* </div> */}
    </CardWithHeader>
  );
};

export default CartItems;
