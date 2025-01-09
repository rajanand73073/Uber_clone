import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const CaptainLogout = () => {
 const token = localStorage.getItem('token')
 const navigate = useNavigate()

 if (!token) {
    console.log("token is not present"); 
 }


     axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/Captain-logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        console.log("response",response.data)
        if (response.status ===200 || response.status===201) {
            localStorage.removeItem('token')
            console.log(localStorage); 
            navigate('/CaptainLogin')
        }
    })
 .catch ((error) =>
    console.error("error",error.message)
)


  return (
    <div>
      Logout
    </div>
  )
}

export default CaptainLogout
