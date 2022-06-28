import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { useNavigate, NavLink } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
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
        <div style={{ "margin": "auto", width: "50%", padding: "1rem" }}>
            <h2>Login Form</h2>
            <Form onSubmit={handleLogin}>
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Text className="text-muted">
                        Don't have an account?
                        <NavLink to="/signup">Signup</NavLink>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>)
}

export default LoginForm;
