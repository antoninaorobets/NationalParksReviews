import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ComentsList from "./ComentsList";

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
        <div>Park {id} Info
            {park.name}
            {(park.comments) 
            ? <ComentsList allComments={park.comments} park_id={park.id} /> 
            : null}
           
        </div>
    )
}
export default ParkInfo