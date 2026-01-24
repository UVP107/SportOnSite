"use client";

import Image from "next/image";
import priceFormatter from "../../utils/price-formatter";
import Button from "../ui/button";
import { FiArrowRight, FiCreditCard, FiTrash2 } from "react-icons/fi";
import CardWithHeader from "../ui/card-with-header";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import totalPrice from "../../utils/total-price";

type TCartItems = {
  handlePayment: () => void;
};

const CartItems = ({ handlePayment }: TCartItems) => {
  const { items, removeItem } = useCartStore();

  return (
    <CardWithHeader title="Cart Items">
      <div className="flex flex-col min-h-112.5">
        <div className="bg-white">
          {items.map((item) => (
            <div
              className="border-b border-gray-200 p-4 flex gap-3 last:border-b-0"
              key={item._id}
            >
              <div className="bg-primary-light aspect-square w-16 flex justify-center items-center rounded-lg">
                <Image
                  src={getImageUrl(item.imageUrl)}
                  alt={item.name}
                  width={63}
                  height={63}
                  className="aspect-square object-contain"
                />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{item.name}</div>
                  <div className="flex gap-3 font-medium text-xs">
                    <div className="text-gray-400">{item.qty}x</div>
                    <div className="font-medium text-primary">
                      {priceFormatter(item.price)}
                    </div>
                  </div>
                </div>
                <Button
                  size="small"
                  variant="ghost"
                  className="w-8 h-8 p-0! self-center"
                  onClick={() => removeItem(item._id)}
                >
                  <FiTrash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Footer: 
           mt-auto is the 'magic' that pushes this to the bottom of the min-height container.
        */}
        <div className="mt-auto border-t border-gray-200 p-5 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-semibold text-gray-600">Total</div>
            <div className="text-primary font-bold">
              {priceFormatter(totalPrice(items))}
            </div>
          </div>
          <Button
            size="small"
            variant="dark"
            className="w-full flex items-center justify-center gap-2 py-3"
            onClick={handlePayment}
          >
            <FiCreditCard /> <span>Proceed to Payment</span> <FiArrowRight />
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;
