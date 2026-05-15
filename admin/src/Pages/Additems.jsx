import React, { useEffect, useState } from 'react'
import Sidenav from '../Component/Sidenav'
import { assets } from '../assets/assets'
import '../css/additems.css'
import { toast } from 'react-toastify'


const AddItems = () => {

    const token = localStorage.getItem("token");
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const res = await fetch("http://localhost:4000/api/food/add", {
                method: "POST",
                headers: { token: token },
                body: formData
            });

            const response = await res.json();

            if (response.success) {
                toast.success(response.message);

                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });

                setImage(false);
            } else {
                toast.error(response.message);
            }
        }
        catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className='container-add'>
            <Sidenav />

            <form onSubmit={handleSubmit}>
                <div>
                    <p>Upload Your Image</p>
                    <label htmlFor="image">
                        <img className="upload-preview"
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt=""
                        />
                    </label>

                    <input type="file"
                        id="image"
                        hidden
                        required
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className='add-name'
                        placeholder="Type here"
                        required
                    />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Description</p>
                    <input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        className='add-description'
                        placeholder="Write content here"
                        required
                    />
                </div>

                <div className='product-add'>
                    <p>Product Category</p>
                    <select
                        name='category'
                        value={data.category}
                        onChange={handleChange}
                        className='select-add'
                    >
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Burger">Burger</option>
                        <option value="RiceItems">Rice Items</option>
                    </select>

                    <div className="add-price">
                        <p>Product Price</p>
                        <input
                            type="number"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            className='price-add'
                            placeholder="$20"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn-submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddItems;
