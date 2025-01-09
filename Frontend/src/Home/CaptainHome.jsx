
import React, { useState ,useRef} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from '../Components/CaptainDetails'
import RidePopUp from '../Components/RidePopup'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../Components/ConfirmRidePopUP'

const CaptainHome = () => {
 

  const [RidePopupPanel, setRidePopupPanel] = useState(true)
  const ridePopupPanelRef = useRef(null)
  const ConfirmRidePanelRef = useRef(null)
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

  useGSAP(
    function () {
      if (ConfirmRidePopupPanel) {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmRidePopupPanel]
  );

  useGSAP(
    function () {
      if (RidePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [RidePopupPanel]
  );

    return (

        <>
        
           <div className='h-screen'>
            <div className='fixed flex items-center top-0 justify-between w-screen p-6'>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            </div>

            <div className='h-3/5'>
             <img src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
             alt="" 
             className="object-cover h-full w-full"/>
            </div>
          
           <div className='h-1/5 p-6'>
           <CaptainDetails/>
           </div>

           <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    // ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    // confirmRide={confirmRide}
                />
            
            
            </div>

      <div ref={ConfirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                
         <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                             setRidePopupPanel={setRidePopupPanel}

         />

            </div>





           </div>
        
        </>
       
        
    )

}

export default CaptainHome