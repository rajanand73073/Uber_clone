import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div className="h-screen w-full  flex flex-col justify-end bg-[url(https://images.pexels.com/photos/731259/pexels-photo-731259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-centre relative">
        <div className=" bg-white  py-4 px-5 w-full pb-6">
          <h2 className="text-3xl font-bold mb-4">Get Started With Uber</h2>
          <Link
            to="/UserLogin"
            className="flex items-center justify-center bg-black text-white px-4 py-2 rounded-lg mt-4"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
