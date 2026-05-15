import React, { useEffect, useState, useContext } from "react";
import Sidenav from "../Component/Sidenav";
import '../css/order.css'
import parcel from '../image/parcel_icon.png'
import { toast } from "react-toastify";


const Order = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/api/order/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await res.json();

    if (data.success) {
      setOrders(data.data);
    } else {
      toast.error("Failed to load orders!");
    }
  };

  const statusHandler = async (newStatus, orderId) => {
    const res = await fetch("http://localhost:4000/api/order/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ orderId, status: newStatus }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Order Status Updated!");
      fetchData();
    } else {
      toast.error("Failed");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="my-orders">
      <Sidenav />

      <h3>Order Page</h3>
      <div className="container">
        {orders.map((order, index) => (
          <div key={index} className="my-orders-order">

            <select
              onChange={(e) => statusHandler(e.target.value, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            <div className="order-details">

              <p>
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity}
                    {i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              <p>{order.address.firstName} {order.address.lastName}</p>
              <p>{order.address.street}</p>

              <p>
                {order.address.city}, {order.address.state}, {order.address.country},{" "}
                {order.address.zipcode}
              </p>

              <p>{order.address.phone}</p>

              <p><b>Items:</b> {order.items.length}</p>
              <p><b>Total:</b> ${order.amount}</p>
            </div>

            <img src={parcel} alt="" />
          </div>

        ))}
      </div>
    </div>
  );
};

export default Order;
