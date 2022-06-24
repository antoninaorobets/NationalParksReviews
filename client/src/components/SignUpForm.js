import React, { useState } from 'react';
import {NavLink} from "react-router-dom"

function SignUpForm() {
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
        }).then(r => r.json()).then(data => console.log(data))
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
