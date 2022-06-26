import React from 'react'
// import { Button, Card, Icon, Image, Label, Menu } from 'semantic-ui-react'
 import { Link } from "react-router-dom"

function ParkCard({park}) {
  return (
    <div>
        {park.name} 
       <Link to={`/parks/${park.id}`} > Park info</Link>
    </div>
  )
}

export default ParkCard