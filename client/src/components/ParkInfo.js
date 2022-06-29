import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ComentsList from "./ComentsList";


function ParkInfo() {
    const { id } = useParams()
    const [park, setPark] = useState('')

    useEffect(() => {
        fetch(`/api/parks/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        setPark(data)
                        console.log("fetched")
                    })
                } else {
                    r.json().then(error => console.errror(error))
                }
            })
    }, [])

    return (
        <Container>
            <h1>{park.full_name}</h1>    
                {(park)
            ? <div style={{"margin": "auto", width: "30%"  }}>        
                    <img
                        className="d-block w-100"
                        src={park.images[2].url}
                        alt={park.images[2].alt_text}
                    />                 
            </div>
            : null}

           
            <p>{park.description}</p>
            <p>{park.weather_info}</p>
            <p>{park.operating_hours}</p>
            <p>{park.address}</p>
            <p>{park.directions_info}</p>
            
            <Container fluid>
            {(park.comments) 
            ? <ComentsList allComments={park.comments} park_id={park.id} /> 
            : null}
         </Container>
        </Container>
    )
}
export default ParkInfo