import Image from "next/image";
import priceFormatter from "../../utils/price-formatter";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";

const cartList = [
  {
    name: "SportsOn Product 4",
    category: "Running",
    price: 444000,
    qty: 1,
    imgUrl: "product-4.png",
  },
  {
    name: "SportsOn Product 5",
    category: "Running",
    price: 555000,
    qty: 2,
    imgUrl: "product-5.png",
  },
  {
    name: "SportsOn Product 6",
    category: "Running",
    price: 666000,
    qty: 3,
    imgUrl: "product-6.png",
  },
];

const totalPrice = cartList.reduce(
  (acc, item) => acc + item.price * item.qty,
  0,
);

const CartPopup = () => {
  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10">
      <div className="p-4 border-b border-gray-200 font-bold text-center">
        Shopping Cart
      </div>
      {cartList.map((item, index) => (
        <div key={index} className="border-b border-gray-200 p-4 flex gap-3">
          <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
            <Image
              src={`/images/products/${item.imgUrl}`}
              alt={item.name}
              width={63}
              height={63}
              className="aspect-square object-contain"
            />
          </div>
          <div className="self-center">
            <div className="text-sm font-medium">{item.name}</div>
            <div className="flex gap-3  font-medium text-xs">
              <div>{item.qty}x</div>
              <div className="font-medium text-primary">
                {priceFormatter(item.price)}
              </div>
            </div>
            <Button
              size="small"
              variant="ghost"
              className="w-7 h-7 p0! self-center ml-auto"
            >
              <FiTrash2 />
            </Button>
          </div>
        </div>
      ))}
      <div className="border-t border-gray-200 p-4">
        <div className="flex justify-between">
          <div className="text-sm">Total</div>
          <div className="text-primary text-xs">
            {priceFormatter(totalPrice)}
          </div>
        </div>
        <Button size="small" variant="dark" className="w-full mt-4">
          Checkout Now <FiArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default CartPopup;
