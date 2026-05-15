import React, { useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContextProvider'
import axios from 'axios'
import '../Orders/Order.css'
import parcel from '../../assets/parcel_icon copy.png'
const Order = () => {
  const { url, token } = useState(StoreContext)
  const [data, setData] = useState([])

  const fetchData = async () => {
    const res = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    )
    if (res.data.success) {
      setData(res.data.data)
    }
  };

  useEffect(() => {
    if (!token) {
      fetchData()
    }
  }, [token])
  return (

    <div className='my-orders'>
      <h2>Orders</h2>
      <div className='container'>
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={parcel}></img>
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1){
                    return item.name +"X"+item.quantity
                  }
                  else{
                    return item.name +"X"+item.quantity+ ","
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>item:{order.items.length}</p>
              <p>
                <span>&#x25cf&#;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchData}></button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Order
