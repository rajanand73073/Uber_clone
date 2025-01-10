import React, { Children, createContext, useContext } from "react";
import { useState } from "react";

export const UserDataContext = createContext();

const Context = ({ children }) => {
  const [user, setuser] = useState({
    email: " ",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });
  return (
    <>
      <UserDataContext.Provider value={{ user, setuser }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default Context;
