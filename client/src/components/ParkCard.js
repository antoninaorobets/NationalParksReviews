import React from 'react'
import { Link } from "react-router-dom"
import { Button, Card } from 'react-bootstrap';

function ParkCard({ park }) {

  return (
    <Card style={{ width: '18rem', "margin": "0.5rem" }}>
      <Card.Img variant="top" src={park.images[0].url} />
      <Card.Body>
        <Card.Title>{park.name}</Card.Title>
        <Card.Text>
          {park.states}
        </Card.Text>
        <Card.Text>
          {park.description}
        </Card.Text>
        <Link to={`/parks/${park.id}`} > See more</Link>
      </Card.Body>
    </Card>
  );
}

export default ParkCard
