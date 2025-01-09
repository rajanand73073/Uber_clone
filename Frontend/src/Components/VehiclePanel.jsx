import React from 'react'



const VehiclePanel = (props) => {
  return (
    <>
<h5 className="p-1 text-center w-[90%] absolute top-0 " onClick={()=>{props.setvehiclePanelOpen(false)}}><i className="ri-arrow-down-wide-line"></i></h5>

<h3 className="text-2xl font-semibold">Choose a Vehicle</h3>

<div className=" Car flex border-2  active:border-black bg-gray-100 rounded-xl w-full p-3 items-center mt-2" onClick={()=>{props.setConfirmedPanelOpen(true)}}
>
  <img
    className="h-12"
    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
    alt=""
  />
  <div className="w-1/2 ml-2">
    <h4>
      UberGo{" "}
      <span>
        <i className=""></i>
      </span>
    </h4>
    <h5 className="font-medium text-sm">2 mins away</h5>
    <p className="font-normal text-xs text-gray-600">Affordable </p>
  </div>
  <h2 className="text-xl font-semibold"> Rupees :193.20 </h2>
</div>

<div className="flex border-2 active:border-black rounded-xl w-full p-3 items-center mt-2"onClick={()=>{props.setConfirmedPanelOpen(true)}}>
  <img
    className="h-12"
    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
    alt=""
  />
  <div className="w-1/2 ml-5">
    <h4>
      UberGo{" "}
      <span>
        <i className=""></i>
      </span>
    </h4>
    <h5 className="font-medium text-sm">2 mins away</h5>
    <p className="font-normal text-xs text-gray-600">Affordable </p>
  </div>
  <h2 className="text-xl font-semibold"> Rupees :65.2 </h2>
</div>

<div className="flex border-2 active:border-black rounded-xl w-full p-3 items-center mt-2" onClick={()=>{props.setConfirmedPanelOpen(true)}}>
  <img
    className="h-12"
    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
    alt=""
  />
  <div className="w-1/2 ml-5">
    <h4>
      UberGo{" "}
      <span>
        <i className=""></i>
      </span>
    </h4>
    <h5 className="font-medium text-sm">2 mins away</h5>
    <p className="font-normal text-xs text-gray-600">Affordable </p>
  </div>
  <h2 className="text-xl font-semibold"> Rupees :100.20 </h2>
</div>
    </>
  )
}

export default VehiclePanel