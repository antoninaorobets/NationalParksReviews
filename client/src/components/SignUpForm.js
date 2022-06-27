import React, { useState, useContext } from 'react';
import { useNavigate,NavLink } from "react-router-dom"
import { UserContext } from '../context/user';

function SignUpForm() {
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const history = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation: ""
    })
    const saveInput = (e) => {
        const key = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [key]: value,
        })
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        fetch('/signup', {
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
                    history("/parks")
                })
            } else {
                r.json().then(error => 
                console.log(error))
             }
        })


    }

    return (
        <div>
            Login Form
            <form onSubmit={handleSignUp}>
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
                <label>
                    Confirm Password:
                    <input
                        type="text"
                        name="password_confirmation"
                        onChange={saveInput} />
                </label>
                <input
                    type="submit"
                    value="Submit" />
            </form>
            <div>
                Already has an account?
                <NavLink to="/login">Login</NavLink>
            </div>
        </div>
    )
}

export default SignUpForm;
