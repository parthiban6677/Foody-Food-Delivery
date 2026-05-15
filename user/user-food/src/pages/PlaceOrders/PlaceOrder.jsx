import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContextProvider'
import '../PlaceOrders/PlaceOrder.css'
import axios from 'axios'


const PlaceOrder = () => {
    const { url, totalecartAmount, food_list, cartItems, token } = useContext(StoreContext)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = []
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id]
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address: data,
            items: orderItems,
            amount: totalecartAmount() + 2
        }

        let res = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (res.data.success) {
            const { session_url } = res.data;
            window.location.replace(session_url)
        } else {
            toast.error("errors!")
        }
    };

    useEffect(() => {
        if (!token) {
            toast.error("Please Login first")
            navigate("/cart")
        }
        else if (totalecartAmount() === 0) {
            toast.error("Please Add Items to Cart");
            navigate("/cart")
        }
    }, [token])
    return (
        <div>
            <form className="place-order" onSubmit={placeOrder}>
                <div className="place-order-left">
                    <p className="title">Delivery Information</p>
                    <div className="multi-fields">
                        <input
                            required
                            name="firstName"
                            value={data.firstName}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="First name"
                        />
                        <input
                            required
                            name="lastName"
                            value={data.lastName}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Last name"
                        />
                    </div>
                    <input
                        required
                        name="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        required
                        name="street"
                        value={data.street}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Street"
                    />
                    <div className="multi-fields">
                        <input
                            required
                            name="city"
                            value={data.city}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="City"
                        />
                        <input
                            required
                            name="state"
                            value={data.state}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="State"
                        />
                    </div>
                    <div className="multi-fields">
                        <input
                            required
                            name="zipcode"
                            value={data.zipcode}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Zip Code"
                        />
                        <input
                            required
                            name="country"
                            value={data.country}
                            onChange={onChangeHandler}
                            type="text"
                            placeholder="Country"
                        />
                    </div>
                    <input
                        required
                        name="phone"
                        value={data.phone}
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="Phone"
                    />
                </div>
                <div className="place-order-right">
                    <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotals</p>
                                <p>${totalecartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>${totalecartAmount() === 0 ? 0 : 2}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>
                                    ${totalecartAmount() === 0 ? 0 : totalecartAmount() + 2}
                                </b>
                            </div>
                        </div>
                        <button type="submit">PROCEED TO PAYMENT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PlaceOrder
