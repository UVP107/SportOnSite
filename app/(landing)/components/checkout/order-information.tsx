"use client";

import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({ formData, setFormData }: TOrderInformation) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="customerName" className="font-medium text-sm">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Type your full name"
              id="customerName"
              name="customerName"
              className="border p-2 rounded-md"
              onChange={handleInputChange}
              value={formData.customerName}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="customerContact" className="font-medium text-sm">
              Whatsapp Number
            </label>
            <input
              type="tel"
              placeholder="Type your whatsapp number"
              id="customerContact"
              name="customerContact"
              className="border p-2 rounded-md"
              onChange={handleInputChange}
              value={formData.customerContact ?? ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="customerAddress" className="font-medium text-sm">
              Shipping Address
            </label>
            <textarea
              placeholder="Type your shipping address"
              id="customerAddress"
              name="customerAddress"
              className="border p-2 rounded-md"
              rows={7}
              onChange={handleInputChange}
              value={formData.customerAddress}
            />
          </div>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;
