import React from 'react'
import { useState, useEffect, useRef, useCallback } from "react";
import ParkCard from './ParkCard';
import {  Row, Container } from 'react-bootstrap';

function ParksList() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const pageSize = 4

  useEffect(() => {
    fetch(`/parks?limit=${pageSize}&start=${page * pageSize}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => setParks(data));
        } else {
          r.json().then((error) => console.log(error));
        }
      })
  }, []);

   useEffect(() => {
     setLoading(true)
     fetch(`parks?limit=${pageSize}&start=${page * pageSize}`)
     .then((r) => {
      if (r.ok) {
        r.json().then((data) => {
         setParks([...parks,...data])
         setLoading(false)
         setHasMore(data.length > 0)
        }
          );
      } else {
        r.json().then((error) => console.log(error));
      }
    })
   }, [page])


   const observer = useRef()
   const lastCardRef = useCallback (node => {
     if (loading) return
     if (observer.current) observer.current.disconnect()
     observer.current = new IntersectionObserver(entries =>{
       if (entries[0].isIntersecting && hasMore) {
         console.log("visible")
         setPage(page => page + 1)}
     })
     if (node) observer.current.observe(node)
   }, [loading])


   const parkCards = parks.map((park, index) => {
    if (parks.length === (index + 1 ))  {
      return  <div className="last" key={park.id} ref={lastCardRef}> <ParkCard   park={park}/> </div>
    }
    else {
      return <ParkCard key={park.id} park={park} />
    }
  })


  // const parkCards = parks.map(park => <ParkCard key={park.id} park={park} />)
  return (
    <div>
      <div  style={{"margin": "auto", width: "50%", padding: "1rem"}}>
      <h1>National Parks in USA</h1>
      </div>
      <Container fluid>
        <Row className="justify-content-md-center">
          {parkCards}
        </Row>
      </Container>
    </div>
  )
}

export default ParksList