import React, { useState, useEffect } from "react"

const UserContext = React.createContext()

function UserProvider({ children }) {
    const [user, setUser] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
     useEffect(() => {
        fetch('/api/me')
          .then(r=>{
            if (r.ok){
              r.json().then(user=>{
                console.log("context 1", user)
                setUser(user)
                setIsLoggedIn(true)
              })
            } else {  
              r.json().then(error => {
                console.error(error)
                console.error("no me")
              })
            }
          })
       }, [])
    return <UserContext.Provider value={{ user, setUser, isLoggedIn: isLoggedIn, setIsLoggedIn: setIsLoggedIn }}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }