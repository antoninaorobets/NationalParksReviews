import React, { useState, useContext } from 'react';
import { useNavigate, NavLink } from "react-router-dom"
import { UserContext } from '../context/user';
import { Form, Button } from 'react-bootstrap';

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
        <div style={{ "margin": "auto", width: "50%", padding: "1rem" }}>
            <h2>Create account</h2>
            <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text"
                        name="username"
                        onChange={saveInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        name="password"
                        onChange={saveInput} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password"
                        name="password_confirmation"
                        onChange={saveInput} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text className="text-muted">
                        Already have an account?
                        <NavLink to="/login">Login</NavLink>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>


        </div>)
}

export default SignUpForm;
