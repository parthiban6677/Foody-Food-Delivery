import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContextProvider'
import icon_white from '../../assets/add_icon_white.png'
import green_icon from '../../assets/add_icon_green.png'
import red from '../../assets/remove_icon_red.png'
import '../FootItem/fooditem.css'
import ratingStar from '../../assets/rating_starts.png'

const FoodItem = ({ id, name, price, description, image }) => {

    const { removeCart, addCart, url, cartItems } = useContext(StoreContext);

    return (
        <div  className="food-item">
            <div className="food-item-img-container">
                <img src={url+"/images/" + image} alt="" className="food-item-image" />
                {!cartItems[id] ? (
                    <img
                        className='add'
                        onClick={() => addCart(id)}
                        src={icon_white}
                        alt=''
                    />
                ) : (
                    <div className="food-item-counter">
                        <img
                            onClick={() => removeCart(id)}
                            src={red}
                            alt=""
                        />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addCart(id)} src={green_icon} alt="" />
                    </div>
                )}

                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <img src={ratingStar} alt="" />
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">${price}</p>
                </div>

            </div>
        </div>
    )
}

export default FoodItem;
