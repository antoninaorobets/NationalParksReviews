import React from 'react'
import { useState, useEffect } from "react";
import ParkCard from './ParkCard';

function ParksList() {
    const [count, setCount] = useState(0);
    const [parks, setParks] = useState([]);
    useEffect(() => {
        fetch("/hello")
          .then((r) => r.json())
          .then((data) => setCount(data.count));
      }, []);
      useEffect(() => {
        fetch("/parks")
          .then((r) => {
            if (r.ok) {
              r.json().then((data) => setParks(data));
            } else {
              r.json().then((error) => console.log(error));
            }
          })
      }, []);
      const parkCards = parks.map(park => <ParkCard key={park.id} park={park}/>)
  return (
    <div>ParksList
        <h1>Page Count: {count}</h1>
        {parkCards}
    </div>
  )
}

export default ParksList