import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const sethandler = async function (e) {
    e.preventDefault();

    const Captain = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captains/captain-login`,
        Captain,
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        console.log(data);
        console.log(data.data.data);

        const token = data.data.token;

        localStorage.setItem("token", token);

        navigate("/captain-home");
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };
  useEffect(() => {
    console.log("User data updated:", data);
  }, [data]);

  return (
    <>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <img
            className=" w-16 mb-8"
            src="https://img.icons8.com/?size=100&id=jhzySURIz897&format=png&color=000000"
            alt=""
          />

          <form onSubmit={(e) => sethandler(e)}>
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
            Join a fleet?
            <Link to="/CaptainSignUp" className="text-blue-600">
              Create new Account
            </Link>
          </p>
        </div>
        <div>
          <Link
            to="/UserSignUp"
            className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;
