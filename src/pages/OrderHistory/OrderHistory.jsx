import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import toast, { LoaderIcon } from "react-hot-toast";
import { getOrders } from "../../Services/OrderService";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrder();
  }, []);

  const formatItems = (items) => {
    if (!Array.isArray(items)) return "No items";
    return items.map((item) => `${item.name} (x${item.quantity})`).join(", ");
  };

  const formatDate = (dateString) => {
  if (!dateString) return 'Invalid Date';

  const parsed = new Date(dateString);
  if (isNaN(parsed)) return 'Invalid Date';

  return parsed.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


  if (loading) {
    return (
      <div>
        <LoaderIcon />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-4">
        <h2>No Orders Found</h2>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2 className="text-light mb-2">All Orders</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>{formatItems(order.items)}</td>
                <td>₹{order.grandTotal}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <span className="badge bg-success">COMPLETED</span>
                </td>
        

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
