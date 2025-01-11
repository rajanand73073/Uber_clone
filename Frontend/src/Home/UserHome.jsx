import React, { useState, useRef, useEffect, useContext } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationsearchPanel from "../Components/LocationsearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import axios from "axios";
import { CreateSocketContext } from "../Context/SocketContext";
import { UserDataContext } from "../Context/UserContext";

const UserHome = () => {
  const [pickup, setpickup] = useState("");
  const [destination, setdestination] = useState("");
  const [panel, setpanel] = useState(false);
  const [panelOpen, setpanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanelOpen, setvehiclePanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [ConfirmedPanelOpen, setConfirmedPanelOpen] = useState(false);
  const confirmedPanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const [VehicleFound, setVehicleFound] = useState(false);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setwaitingForDriver] = useState(false);
  const [fare, setfare] = useState("");
  const { user } = useContext(UserDataContext);
  const { socket } = useContext(CreateSocketContext);
  const [vehicleType, setvehicleType] = useState("");

  const sethandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
        }),
          gsap.to(panelCloseRef.current, {
            opacity: 1,
          });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
        }),
          gsap.to(panelCloseRef.current, {
            opacity: 0,
          });
      }
    },
    [panelOpen],
  );

  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanelOpen],
  );

  useGSAP(
    function () {
      if (ConfirmedPanelOpen) {
        gsap.to(confirmedPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmedPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmedPanelOpen],
  );

  useGSAP(
    function () {
      if (VehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [VehicleFound],
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver],
  );

  async function findTrip(e) {
    e.preventDefault();
    if (pickup.trim() === "" || destination.trim() === "") {
      alert("please choose pickup or destination");
    } else {
      console.log(pickup);

      setvehiclePanelOpen(true);
      setpanelOpen(false);
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/ride/getfare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("response", response.data);

      setfare(response.data.data);
    } catch (error) {
      console.error("error", error.message);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ride/rideBooking`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      console.error(error.message);
    }

    console.log(response);
  }

  useEffect(() => {
    console.log("user", user);

    socket.emit("join", { userType: "User", userId: user._id });
  }, [user]);

  return (
    <>
      <div>
        <img
          src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
          alt=""
          className="w-16 absolute left-5 top-5"
        />
        <div className="h-screen w-screen overflow-hidden">
          {/* image for temporary use  */}
          <img
            src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif"
            alt=""
            className="object-cover h-full w-full"
          />
        </div>

        <div className="absolute h-screen top-0 w-full flex flex-col justify-end overflow-hidden">
          <div className="h-[35%]  bg-white p-5 relative">
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setpanelOpen(false);
              }}
              className="absolute opacity-0 right-6 top-6 text-2xl"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold text-center">Find a trip</h4>
            <form onSubmit={sethandler} className="relative ">
              <input
                onClick={() => setpanelOpen(true)}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-1"
                type="text"
                placeholder="Add a pick-up location"
                onChange={(e) => setpickup(e.target.value)}
                value={pickup}
              />
              <input
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-2"
                type="text"
                placeholder="Add a destination location"
                onChange={(e) => setdestination(e.target.value)}
                value={destination}
                onClick={() => setpanelOpen(true)}
              />
              <button
                className="bg-black w-full rounded-lg text-white p-2 mt-4"
                onClick={findTrip}
              >
                Find Trip
              </button>
            </form>
          </div>
          <div className="h-0 bg-white" ref={panelRef}>
            <LocationsearchPanel setpanelOpen={setpanelOpen} />
          </div>
        </div>

        <div
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-8 pt-12"
          ref={vehiclePanelRef}
        >
          <VehiclePanel
            setvehiclePanelOpen={setvehiclePanelOpen}
            setConfirmedPanelOpen={setConfirmedPanelOpen}
            fare={fare}
            setvehicleType={setvehicleType}
          />
        </div>

        <div
          className="fixed w-full z-10 bottom-0 bg-white px-3 py-8 pt-14 "
          ref={confirmedPanelRef}
        >
          <ConfirmRide
            setConfirmedPanelOpen={setConfirmedPanelOpen}
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
            fare={fare}
            createRide={createRide}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-14"
        >
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-14"
        >
          <WaitingForDriver
            setVehicleFound={setVehicleFound}
            setwaitingForDriver={setwaitingForDriver}
            waitingForDriver={WaitingForDriver}
          />
        </div>
      </div>
    </>
  );
};

export default UserHome;
