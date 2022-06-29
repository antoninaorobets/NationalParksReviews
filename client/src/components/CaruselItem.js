import React from 'react'
import { Button, Row, Container, Carousel } from 'react-bootstrap';

function CaruselItem({img}) {
  console.log(img)
  return (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img.url}
          alt={img.alt_text}
        />
        <Carousel.Caption>
          <h3>{img.title}</h3>
          <p>{img.caption}</p>
        </Carousel.Caption>
      </Carousel.Item>

  );
}


export default CaruselItem