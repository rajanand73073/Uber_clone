import React from "react";
import { createContext, useContext } from "react";

export const CaptainDataContext = createContext();
const CaptainContext = ({ children }) => {
  const [CaptainData, setCaptainData] = useState("");
  const [error, seterror] = useState("");

  const value = {
    CaptainData,
    setCaptainData,
    error,
    seterror,
  };

  return (
    <>
      <CaptainDataContext.Provider value={ value }>
        {children}
      </CaptainDataContext.Provider>
    </>
  );
};

export default CaptainContext;
// export const usecontext = () => {
//   return useContext(CaptainDataContext);
// };
