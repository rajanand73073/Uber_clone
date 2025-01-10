import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CaptainSignUp = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [captaindata, setcaptaindata] = useState({});
  const [vehicleColor, setvehicleColor] = useState("");
  const [vehicleCapacity, setvehicleCapacity] = useState("");
  const [vehiclePlate, setvehiclePlate] = useState("");
  const [vehicleType, setvehicleType] = useState("");
  const navigate = useNavigate();
  const sethandler = async function (e) {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/captain-register`,
        newCaptain,
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log(data);
        console.log(data.data.registeredCaptain);

        const token = data.data.token;

        localStorage.setItem("token", token);

        navigate("/captain-home");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };
  // useEffect(() => {
  //   console.log("User data updated:", captaindata);
  // }, [captaindata]);
  return (
    <>
      <div className="px-4 py-2 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-10 "
            src="https://img.icons8.com/?size=100&id=jhzySURIz897&format=png&color=000000"
            alt=""
          />

          <form
            onSubmit={(e) => {
              sethandler(e);
            }}
          >
            <h3 className="text-lg w-1/2 font-medium mb-2">Enter Your Name </h3>
            <div className="flex gap-4">
              <input
                type="text"
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                placeholder="first name"
                value={firstname}
                onChange={(e) => setfirstname(e.target.value)}
              />

              <input
                type="text"
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                placeholder="last name"
                value={lastname}
                onChange={(e) => setlastname(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">Enter Your Email</h3>

            <input
              type="email"
              required
              className="bg-[#eeeeee] w-full mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Set Password</h3>

            <input
              type="password"
              required
              className="bg-[#eeeeee] w-full mb-6 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
              placeholder="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => {
                  setvehicleColor(e.target.value);
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => {
                  setvehiclePlate(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => {
                  setvehicleCapacity(e.target.value);
                }}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                value={vehicleType}
                onChange={(e) => {
                  setvehicleType(e.target.value);
                }}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Create Captain Account
            </button>
          </form>
          <p>
            Already have a Account?
            <Link to="/CaptainLogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignUp;
