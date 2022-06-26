import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate, NavLink } from "react-router-dom";

function LoginForm() {
    const {user, setUser, isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const history = useNavigate()
  
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const saveInput = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [key]: value,
        })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then(r => {
            if (r.ok) {
                r.json().then(data => {
                    setUser(data)
                    setIsLoggedIn(true)
                    history("/parks/my_parks")
                  })
                }
            else { 
                r.json().then(error => 
                    console.log(error))
            }
        })      
    }
    return (
        <div>
            Login Form
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        onChange={saveInput} />
                </label>
                <label>
                    Password:
                    <input
                        type="text"
                        name="password"
                        onChange={saveInput} />
                </label>
                <input
                    type="submit"
                    value="Submit" />
            </form>
            <div>
                Don't have an account?
                <NavLink to="/signup">Signup</NavLink>
            </div>
            <div>
        
                <NavLink to="/signup">Forgot password?</NavLink>
            </div>
        </div>)
}

export default LoginForm;
