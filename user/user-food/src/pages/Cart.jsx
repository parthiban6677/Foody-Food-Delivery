import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContextProvider'
import { useNavigate } from "react-router-dom";
import '../pages/Cart.css'
const Cart = () => {

    const {
        food_list,
        cartItems,
        setCartItems,
        addCart,
        removeCart,
        totalecartAmount,
        url,
    } = useContext(StoreContext)

    const navigate = useNavigate();

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                           <div>
                             <div  className="cart-items-title cart-items-item">
                                <img src={url + "/images/" +item.image} alt="" />
                                <p>{item.name}</p>
                                <p>${item.price}</p>
                                <p>{cartItems[item._id]}</p>
                                <p>${item.price * cartItems[item._id]}</p>
                                <p onClick={() => removeCart(item._id)} className='cross'>X</p>
                            </div>

                           </div>
                        )
                    }
                })}
            </div>
            <div className="cart-bottom">
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
                            <b>${totalecartAmount() === 0 ? 0 : totalecartAmount() + 1}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/placeOrder')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promocode, Enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder="promo code" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
