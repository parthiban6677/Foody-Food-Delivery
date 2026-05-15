import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Component/Navbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Home/Home'
import Login from './Component/Login/Login'
import Footer from './Component/Footer/Footer'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrders/PlaceOrder'
import Order from './pages/Orders/Order';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div>
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/placeOrder' element={<PlaceOrder />} />
          <Route path='/order' element={<Order />} />
        </Routes>
        <Footer />
      </div>

    </>
  )
}

export default App
