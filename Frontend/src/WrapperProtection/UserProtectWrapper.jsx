import React, { useContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../Context/UserContext";

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const token = localStorage.getItem("token");
  const {setuser}= useContext(UserDataContext)
  //  if (!token) {
  //   navigate('/login')
  //  }
  //React Rules: Always use useEffect or similar hooks for side effects(like:navigate,setstate) to comply with React's lifecycle.
 
  useEffect(() => {
    if (!token) {
      navigate("/UserLogin");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/users/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log(response.data);
          const data = response.data;
          setuser(data.data.user);
          console.log(data.data.user);
          setloading(false);
        }
      })
      .catch((error) => {
        console.error("error",error.message)
        localStorage.removeItem("token");
        navigate("/UserLogin");
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return(
  <>
  {children}
  </>
  );
  
};

export default UserProtectWrapper;
