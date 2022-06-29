import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/user';

function TopBar() {
    console.log("render Top bar")
    const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    const handleLogout = (e) => {
        e.preventDefault()
        fetch('/api/logout', {
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
                        <NavLink to="/parks" style={{padding: "8px"}}>All Parks</NavLink>
                        <div className="vr" > </div>
                        {(isLoggedIn)
                            ? <NavLink to="/parks/my_parks" style={{padding: "8px"}}>My Parks</NavLink>
                            : null}
                    </Nav>
                   
                    <Nav>
                        {(isLoggedIn)
                            ? <Navbar.Text>
                                Signed in as: {user.username}

                            </Navbar.Text>
                            : null} 
                            <div className="vr" style={{padding: "8px"}} > <hr />  </div>
                        {(isLoggedIn)
                            ? <NavLink to="/parks" style={{padding: "8px"}} onClick={handleLogout}> Logout </NavLink>
                            : <NavLink to="/login"> Login </NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopBar
