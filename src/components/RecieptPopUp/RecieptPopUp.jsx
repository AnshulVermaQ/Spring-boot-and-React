import React from 'react';
import './RecieptPopUp.css';

const RecieptPopUp = ({ orderDetails, onClose, onPrint }) => {
  return (
    <div className='reciept-popup-overlay  text-dark'>
      <div className='reciept-popup'>
        <div className='text-center mb-4'>
          <i className='bi bi-check-circle-fill text-success fs-2'></i>
        </div>

        <h3 className='text-center mb-4'>Order Receipt</h3>

        <p>
          <strong>Order ID:</strong> {orderDetails.orderId}
        </p>
        <p>
          <strong>Name:</strong> {orderDetails.customerName}
        </p>
        <p>
          <strong>Phone no.:</strong> {orderDetails.phoneNumber}
        </p>

        <hr className='my-3' />

        <h5 className='mb-3'>Items Ordered</h5>

        <div className='cart-items-scrollable'>
          {orderDetails.cartItems.map((item, index) => (
            <div key={index} className='cart-item d-flex justify-content-between mb-2'>
              <span>{item.name} x ({item.quantity})</span>
              <span>&#8377;{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className='my-3' />

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-dark'>Tax (1%):</span>
          <span className='text-dark'>&#8377;{orderDetails.tax.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-dark'>Grand Total:</span>
          <span className='text-dark'>&#8377;{orderDetails.grandTotal.toFixed(2)}</span>
        </div>

        <div className='d-flex justify-content-between mb-2'>
          <span className='text-dark'>Payment Method:</span>
          <span className='text-dark'>{orderDetails.paymentMethod}</span>
        </div>

        <div className='d-flex justify-content-between mt-4'>
          <button className='btn btn-secondary' onClick={onClose}>Close</button>
          <button className='btn btn-primary' onClick={onPrint}>Print</button>
        </div>
      </div>
    </div>
  );
};

export default RecieptPopUp;
