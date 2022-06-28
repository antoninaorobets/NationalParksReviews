import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComentsList from "./ComentsList";
import { Button, Row, Container } from 'react-bootstrap';

function ParkInfo() {
    const { id } = useParams()
    const [park, setPark] = useState('')

    useEffect(() => {
        fetch(`/parks/${id}`)
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
    console.log("render Park info", park.comments)
    return (
        <div>
            <h1>{park.full_name}</h1>
            <p>{park.address}</p>
            <p>{park.description}</p>
            <p>{park.weather_info}</p>
            <p>{park.directions_info}</p>
            <p>{park.operating_hours}</p>
            <a href={park.url}>wersite</a>
            
            
            <Container fluid>
            {(park.comments) 
            ? <ComentsList allComments={park.comments} park_id={park.id} /> 
            : null}
         </Container>
        </div>
    )
}
export default ParkInfo