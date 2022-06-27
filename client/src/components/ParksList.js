import React from 'react'
import { useState, useEffect } from "react";
import ParkCard from './ParkCard';
import { Button, Row, Container } from 'react-bootstrap';

function ParksList() {
  const [count, setCount] = useState(0);
  const [parks, setParks] = useState([]);
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
  const parkCards = parks.map(park => <ParkCard key={park.id} park={park} />)
  return (
    <div>
      <div  style={{"margin": "auto", width: "50%", padding: "1rem"}}>
      <h1>National Parks in USA</h1>
      </div>
      <Container fluid="md">
        <Row className="justify-content-md-center">
          {parkCards}
        </Row>
      </Container>
    </div>
  )
}

export default ParksList