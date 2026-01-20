import CardWithHeader from "../ui/card-with-header";

const OrderInformation = () => {
  return (
    <CardWithHeader title="Order Information">
      <div className="bg-white">
        {/* <div className="p-5 border-b border-gray-200"> */}
        {/* <h2 className="font-bold text-lg">Order Information</h2> */}
      </div>
      <div className="p-5">
        <div className="input-group">
          <label htmlFor="full_name">Full Name</label>
          <input type="text" placeholder="Type your full name" id="full_name" />
          <label htmlFor="wa_number">Whatsapp Number</label>
          <input
            type="text"
            placeholder="Type your whatsapp number"
            id="full_name"
          />
          <label htmlFor="address">Shipping Address</label>
          <textarea
            placeholder="Type your shipping address"
            id="address"
            rows={7}
          />
        </div>
      </div>
      {/* </div> */}
    </CardWithHeader>
  );
};

export default OrderInformation;
