import { useEffect, useState } from 'react'
import Sidenav from '../Component/Sidenav'
import { url } from '../assets/assets'
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import '../css/additems.css'
const ListItems = () => {

  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");
  const admin = true;

  const ListData = async () => {
    const res = await fetch("http://localhost:4000/api/food/list");
    const data = await res.json();

    if (data.success) {
      setList(data.data);
    } else {
      toast.error("Error fetching list");
    }
  };

  const removeFood = async (foodId) => {
    const res = await fetch("http://localhost:4000/api/food/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token
      },
      body: JSON.stringify({ id: foodId })
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      ListData();
    } else {
      toast.error(data.message);
    }
  };


  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    ListData();
  }, []);

  return (
    <div className="food-list-container">
  <Sidenav/>

      <h2 className='all-food'>All Food Items</h2>

      <div className="food-list">
        {list.map((item) => (
          <div className="food-card" key={item._id}>
          <img src={`${url}/images/${item.image}`} alt="" />


            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="price">₹{item.price}</p>

            <button className="remove-btn" onClick={() => removeFood(item._id)}>
              <MdOutlineRemoveShoppingCart />
            </button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ListItems;
