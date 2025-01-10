import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  try {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        if (response.status === 200 || response.status === 201) {
          localStorage.removeItem("token");
          console.log(localStorage);

          navigate("/UserLogin");
        }
      });
  } catch (error) {
    console.error("error", error.message);
  }

  return (
    <>
      <div>Logout</div>
    </>
  );
};

export default UserLogout;
