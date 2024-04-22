import React, { createContext, useEffect, useState } from 'react'
export const tokenAuthContext = createContext()

function TokenAuth({children}) {
    const [isAuthorised,setAuthorised] = useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setAuthorised(true)
        }else{
            setAuthorised(false)
        }

    },[isAuthorised])
  return (
    <>
   <tokenAuthContext.Provider value={{isAuthorised,setAuthorised}}> {children}
   </tokenAuthContext.Provider>
    
    </>
  )
}

export default TokenAuth