import React, { useContext, useState } from "react";
import "./CartSummary.css";
import { AppContext } from "../../context/AppContext";
import RecieptPopUp from "../RecieptPopUp/RecieptPopUp";
import toast from "react-hot-toast";
import { createOrder } from "../../Services/OrderService";

const CartSummary = ({
  customerName,
  customerNumber,
  setCustomerName,
  setCustomerNumber,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const { cartItems } = useContext(AppContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = totalAmount * 0.01;
  const grandTotal = totalAmount + tax;

  const completePayment = async () => {
    if (!customerName || !customerNumber) {
      toast.error("Please enter customer name and number");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderData = {
      customerName,
      phoneNumber: customerNumber,
      cartItems,
      subtotal: totalAmount,
      tax,
      grandTotal,
      paymentMethod: "CASH",
    };

    try {
      const response = await createOrder(orderData);
      if (response.status === 201) {
        toast.success("Payment done successfully");
        setOrderDetails(response.data);
        setShowPopUp(true);
        setCustomerName("");
        setCustomerNumber("");
        cartItems.length = 0; 
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  const handlePrintReciept = () => {
    window.print();
  };

  return (
    <div>
      <div className="mt-2">
        <div className="cart-summary-details">
          <div className="d-flex justify-content-between mb-2">
            <span className="text-light">Item:</span>
            <span className="text-light">&#8377;{totalAmount.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-light">Tax (1%):</span>
            <span className="text-light">&#8377;{tax.toFixed(2)}</span>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span className="text-light">Grand Total:</span>
            <span className="text-light">&#8377;{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="d-flex">
        <button className="btn btn-success flex-grow-1" onClick={() => toast.success("Payment successful")}>
          Payment
        </button>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button className="btn btn-warning flex-grow-1" onClick={completePayment}>
          Place Order
        </button>
      </div>

      {showPopUp && (
        <RecieptPopUp
          orderDetails={orderDetails}
          onClose={() => setShowPopUp(false)}
          onPrint={handlePrintReciept}
        />
      )}
    </div>
  );
};

export default CartSummary;
