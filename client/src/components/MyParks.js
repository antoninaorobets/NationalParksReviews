import React from 'react'
import { useState, useEffect, useContext } from "react";
import ParkCard from './ParkCard';
import { UserContext } from '../context/user';
import { useNavigate } from "react-router-dom";

function MyParks() {
    const [parks, setParks] = useState([]);
    const { user, setUser, isLoggedIn, setIsLogdedIn } = useContext(UserContext)
   
    useEffect(() => {
        console.log("useEffect and fetch in MyParks", user)
        if (!user) return 
        fetch(`/parks?user_id=${user.id}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => setParks(data));
                } else {
                    r.json().then((error) => console.log(error));
                }
            })
    }, [user]);
    const parkCards = parks.map(park => <ParkCard key={park.id} park={park} />)
    return (
        <div> 
            <h1>My Parks</h1>
            {parkCards}
            
        </div>
    )
}


export default MyParks