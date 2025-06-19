import React, { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

// export const useCaptain = () =>{
//     const context = useContext(CaptainContext)
//     if(!context){
//         throw new Error('useCaptain must be used within a CaptainProvider')
//     }
//     return context
// }

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, seterror] = useState(null)

  const updateCapatin = (captainData) => {
    setCaptain(captainData);
  };
  const value = {
    captain,
    setCaptain,
    updateCapatin,
    isLoading,
    setIsLoading,
    error,
    seterror
  }

  return (
    <CaptainDataContext.Provider value={value}>{children}</CaptainDataContext.Provider>
  );

}
export default CaptainContext

