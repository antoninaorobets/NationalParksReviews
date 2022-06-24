import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/user';


function TopBar() {
    const { user, setUser, isLogin, setIsLogin } = useContext(UserContext)

    const handleLogout = (e) => {
        e.preventDefault()
        fetch('/logout', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(r => {
                if (r.ok) {
                    r.json().then(setIsLogin(false), setUser(null))
                } else {
                    r.json().then(error => console.log(error))
                }
            })
    }
    const logout = <div> <button onClick={handleLogout}>Logout</button> </div>
    const loggedin = <NavLink to="/login"> Login </NavLink>
    const myParks =  <NavLink to="/parks/my_parks"><button>My Reviewed Parks</button></NavLink>

    return (
        <div style={{ "border": "1px solid blue", padding: "2px" }}>
            <NavLink to="/parks"><button>All Parks</button></NavLink>
            My new app:
            {(isLogin) ? `Hi ${user.username}!` : null}
            {(isLogin) ? logout : loggedin}
            {(isLogin) ? myParks : null}
        </div>
    )
}

export default TopBar
