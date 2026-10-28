import React from 'react'
import store from '..././../../src/assets/play_store.png'
import appstore from '.../../../src/assets/app_store.png'

const MobileApp = () => {
  return (
    <div>
      <div id='mobile-app'>
        <p>For Better Exprience Download <br />Tomato App</p>
        <div>
          <img src={store} alt="" />
          <img src={appstore} alt="" />

        </div>
      </div>
    </div>
  )
}

export default MobileApp
