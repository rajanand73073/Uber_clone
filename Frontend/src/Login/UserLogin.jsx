import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { UserDataContext } from "../Context/UserContext";
import Context from "../Context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const { user, setuser } = useContext(UserDataContext);
  const sethandler = async function (e) {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };
    console.log(user);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/users/login`,
        user
      );
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log(data);
        setuser(data.data.user);
        const token = data.data.token;
        localStorage.setItem("token", token);
        setemail("");
        setpassword("");
        console.log(data.data.InUser);
        navigate("/home");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  return (
    <>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className=" w-16 mb-8"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt=""
          />

          <form onSubmit={sethandler}>
            <h3 className="text-lg font-medium mb-2">Enter your Email id</h3>
            <input
              type="email"
              required
              value={email}
              placeholder="email@example.com"
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              defaultValue={false}
              onChange={(e) => setemail(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-2">Enter Your Password</h3>
            <input
              type="password"
              required
              placeholder="password"
              value={password}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base "
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
              Login
            </button>
          </form>

          <p>
            New here?
            <Link to="/UserSignUp" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/CaptainSignUp"
            className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as Captain
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
