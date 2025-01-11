import React from "react";
import { createContext, useContext, useState } from "react";

export const CaptainDataContext = createContext();
const CaptainContext = ({ children }) => {
  const [error, seterror] = useState("");
  const [CaptainData, setCaptainData] = useState({});

  return (
    <>
      <CaptainDataContext.Provider
        value={{ CaptainData, setCaptainData, error, seterror }}
      >
        {children}
      </CaptainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
// export const usecontext = () => {
//   return useContext(CaptainDataContext);
// };
