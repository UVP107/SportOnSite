"use client";
import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import Button from "../components/ui/button";
import { useState, ChangeEvent } from "react";

const ProductActions = () => {
  const [qty, setQty] = useState<number | string>(1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQty("");
      return;
    }

    const num = parseInt(value);
    if (!isNaN(num)) {
      setQty(num < 1 ? 1 : num);
    }
  };

  const handleBlur = () => {
    if (qty === "" || Number(qty) < 1) {
      setQty(1);
    }
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-5">
      <div className="border border-gray-500 inline-flex h-14 min-w-[100px] bg-white">
        <input
          type="number"
          value={qty}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-full flex-1 font-medium text-center text-xl outline-none border-r border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <div className="flex flex-col w-10">
          <button
            type="button"
            className="flex-1 border-b border-gray-500 cursor-pointer flex justify-center items-center hover:bg-gray-100 transition-colors"
            onClick={() => setQty((prev) => (Number(prev) || 0) + 1)}
          >
            <FiChevronUp size={14} />
          </button>
          <button
            type="button"
            className="flex-1 cursor-pointer flex justify-center items-center hover:bg-gray-100 transition-colors"
            onClick={() =>
              setQty((prev) => (Number(prev) > 1 ? Number(prev) - 1 : 1))
            }
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      <Button className="w-full flex items-center justify-center gap-2 py-4">
        <FiShoppingBag size={20} />
        <span className="whitespace-nowrap">Add to Cart</span>
      </Button>

      <Button
        variant="dark"
        className="w-full flex items-center justify-center gap-2 py-4"
      >
        <span className="whitespace-nowrap">Checkout Now</span>
        <FiArrowRight size={20} />
      </Button>
    </div>
  );
};

export default ProductActions;
