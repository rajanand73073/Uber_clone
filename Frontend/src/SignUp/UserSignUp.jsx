import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Context, { UserDataContext } from "../Context/UserContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


  const UserSignUp = () => {
  const navigate = useNavigate();
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [userdata, setuserdata] = useState({});
  const { user, setuser } = useContext(UserDataContext);

  const sethandler = async function (e) {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      // console.log(fullname[0]);
      // console.log(fullname[1]);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/register`,
        newUser
      );

      // Check if response status is 200 or 201 to confirm success
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        // console.log(response);

        // console.log(data);
        // console.log(data.user);
        // console.log("Type of Data:", typeof data);
        // console.log(response.data.user);
        // console.log("Data Object:", response.data.data);
        console.log("User Object:", data.data.user);

        setuser(data.data.user);
         const token = data.data.token
        localStorage.setItem('token', token);

        setemail("");
        setfirstname("");
        setlastname("");
        setpassword("");

        navigate("/home"); // Navigate after successful registration
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  //  useEffect(() => {

  //     console.log("User data updated:", userdata);

  // }, [userdata]);

  return (
    <>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form onSubmit={(e) => sethandler(e)}>
            <h3 className="text-lg w-1/2 font-medium mb-2">Enter Your Name </h3>
            <div className="flex gap-4 mb-6">
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

            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full placeholder:text-base">
              Create Account
            </button>
          </form>
          <p>
            Already have a Account?
            <Link to="/UserLogin" className="text-blue-600">
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

export default UserSignUp;
