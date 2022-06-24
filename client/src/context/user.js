import React, { useState, useEffect } from "react"

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState()
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        fetch('/me')
          .then(r=>{
            if (r.ok){
              r.json().then(user=>{
                console.log("context 1", user)
                setUser(user)
                setIsLogin(true)
              })
            } else {  
              r.json().then(error => console.error(error))
            }
          })
      }, [])
      console.log("context 2", user)
    return <UserContext.Provider value={{ user, setUser, isLogin, setIsLogin }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }