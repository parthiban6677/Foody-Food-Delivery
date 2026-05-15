import React from 'react'
import { useState } from 'react'
import Header from '../Component/Header/Header'
import Menu from '../Component/Menu/Menu'
import FoodDisplay from '../Component/FoodDisplay/FoodDisplay'
import MobileApp from '../Component/Mobile-App/MobileApp'
import Footer from '../Component/Footer/Footer'


const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Menu category={category} setCategory={category} />
      <FoodDisplay category={category} />
      <MobileApp />
    

    </div>
  )
}

export default Home
