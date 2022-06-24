import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'

function ParkInfo() {
    const { id } = useParams()
    const [park, setPark] = useState('')
  
    useEffect(() => {
        fetch(`/parks/${id}`)
            .then(r => {
                if (r.ok) {
                    r.json().then(data => setPark(data))
                } else {
                    r.json().then(error => console.errror(error)) 
                }
            })
    }, [])

  return (
    <div>Park {id} Info
    {park.name}
    </div>
  )
}

export default ParkInfo