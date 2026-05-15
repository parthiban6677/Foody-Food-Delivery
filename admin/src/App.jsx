
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './main/Login';
import Register from './main/Register';
import Sidenav from './Component/Sidenav';
import ListItems from './Pages/Listitems'
import Additems from './Pages/Additems'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from './Pages/Order' 

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
   
        <div>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/additems' element={<Additems />} />
            <Route path='/listitems' element={<ListItems />} />
            <Route path='/order' element={<Order />} />

          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
