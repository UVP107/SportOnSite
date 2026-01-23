import Image from "next/image";
import priceFormatter from "../../utils/price-formatter";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { getImageUrl } from "@/app/lib/api";
import totalPrice from "../../utils/total-price";

const CartPopup = () => {
  const { push } = useRouter();
  const { items, removeItem } = useCartStore();

  const handleCheckout = () => {
    push("/checkout");
  };

  return (
    <div className="absolute bg-white right-0 top-12 rounded-xl shadow-xl shadow-black/10 border border-gray-200 w-90 z-50 overflow-auto max-h-87">
      <div className="p-4 border-b border-gray-200 font-bold text-center">
        Shopping Cart
      </div>
      {items.length ? items.map((item, index) => (
        <div
          key={index}
          className="border-b border-gray-200 p-4 flex gap-3 key={index}"
        >
          <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
            <Image
              src={getImageUrl(item.imageUrl)}
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
              onClick={() => removeItem(item._id)}
            >
              <FiTrash2 size={16} />
            </Button>
          </div>
        </div>
      )): (
        <div className="text-center opacity-50 py-5">
          Your shopping cart is empty
        </div>
      )
      }
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice(items))}
          </div>
        </div>
        <Button
          size="small"
          variant="dark"
          className="w-full mt-4"
          onClick={handleCheckout}
        >
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
