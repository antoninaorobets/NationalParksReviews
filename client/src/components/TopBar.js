import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { UserContext } from '../context/user';
import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function TopBar() {
    console.log("render Top bar")
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
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
                    r.json().then(setIsLoggedIn(false), setUser(null))
                } else {
                    r.json().then(error => console.log(error))
                }
            })
    }

    return (
        <Navbar sticky="top"   bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">National Parks</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/parks">All Parks</Nav.Link>
                        {(isLoggedIn)
                            ? <Nav.Link href="/parks/my_parks">My Parks</Nav.Link>
                            : null}
                    </Nav>
                    <Nav>
                        {(isLoggedIn)
                            ? <Navbar.Text>
                                Signed in as: {user.username}

                            </Navbar.Text>
                            : null} 
                        {(isLoggedIn)
                            ? <Nav.Link to="/parks" onClick={handleLogout}> Logout </Nav.Link>
                            : <NavLink to="/login"> Login </NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar
