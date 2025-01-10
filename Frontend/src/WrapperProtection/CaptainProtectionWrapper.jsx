import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CaptainDataContext } from "../Context/CaptainContext";
import { useContext } from "react";

const CaptainProtectionWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");
  // const {setCaptainData}= useContext(CaptainDataContext)
  //  if (!token) {
  //   navigate('/login')
  //  }
  //React Rules: Always use useEffect or similar hooks for side effects(like:navigate,setstate) to comply with React's lifecycle.

  useEffect(() => {
    if (!token) {
      navigate("/UserLogin");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/captains/captain-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("response", response.data);
          const data = response.data;
          // setCaptainData(data.data.Profile);
          console.log(data.data.Profile);
          setloading(false);
        }
      })
      .catch((error) => {
        console.error("error", error.message);
        localStorage.removeItem("token");
        navigate("/UserLogin");
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectionWrapper;
