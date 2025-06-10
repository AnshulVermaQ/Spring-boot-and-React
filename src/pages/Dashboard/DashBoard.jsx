import React, { useEffect, useState } from 'react';
import { fetchDashBoardData } from '../../Services/DashBoard';
import toast from 'react-hot-toast';

const DashBoard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchDashBoardData();

      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Error fetching dashboard data");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center fw-bold my-4">Loading...</div>;
  }

  if (!data || !data.recentOrders) {
    return <div className="text-white text-center fw-bold my-4">No Data Available</div>;
  }

  return (
    <div className="container-fluid min-vh-100 py-4" style={{ backgroundColor: '#343a40' }}>
       <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-primary h-100 text-center shadow">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Today's Sales</h5>
              <h3 className="card-text">₹{data.todaySales?.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card text-white bg-primary h-100 text-center shadow">
            <div className="card-body d-flex flex-column justify-content-center">
              <h5 className="card-title">Today's Orders</h5>
              <h3 className="card-text">{data.todayOrderCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Recent Orders</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive w-100">
            <table className="table table-bordered table-hover table-striped text-white" style={{ backgroundColor: '#495057' }}>
              <thead className="table-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>₹{order.grandTotal.toFixed(2)}</td>
                    <td>{order.paymentMethod || 'CASH'}</td>
                    <td>
                      <span className="badge bg-success">{order.paymentDetails?.status || 'COMPLETED'}</span>
                    </td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
