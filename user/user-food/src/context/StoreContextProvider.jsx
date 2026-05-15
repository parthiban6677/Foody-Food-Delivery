import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:4000";
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);

    // Add to Cart
    const addCart = async (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if (token) {
            const res = await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );

            if (res.data.success) {
                toast.success("Item Added to Cart")
            } else {
                toast.error("Something is Wrong")
            }
        }
    };

    // Remove from Cart
    const removeCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            const res = await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );

            if (res.data.success) {
                toast.success("Item removed from Cart")
            }
            else {
                toast.error("Something is wrong")
            }
        }
    };

    // Total Cart Amount
    const totalecartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch food list
    const fetchFoodList = async () => {
        const res = await axios.get(url + "/api/food/list");
        if (res.data.success) {
            setFoodList(res.data.data);
        } else {
            alert("Error! Products are not fetching..");
        }
    };

    // Get cart data
    const cartdata = async () => {
        const res = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        );
        setCartItems(res.data.cartData || {});
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            if (localStorage.getItem("token")) {
                const savedToken = localStorage.getItem("token");
                setToken(savedToken);
                await cartdata(savedToken);
            }
        }
        loadData();
    }, []);

    const contextvalue = {
        food_list,
        cartItems,
        setCartItems,
        addCart,
        removeCart,
        totalecartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextvalue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
