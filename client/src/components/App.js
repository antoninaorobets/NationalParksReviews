
import React, { useEffect, useContext } from "react";
import {  Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"
import TopBar from "./TopBar";
import ParksList from "./ParksList"
import ParkInfo from "./ParkInfo";
import { UserContext} from "../context/user"
import MyParks from "./MyParks";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const {isLoggedIn} = useContext(UserContext)
  
  return (
      <div className="App">
          <TopBar />
          <Routes>
            <Route path="/login" element={< LoginForm />} />
            <Route path="/signup" element={< SignUpForm />} />
            <Route path="/parks/:id" element={<ParkInfo />} />
            <Route path="/parks/my_parks" element={<MyParks />} />
            <Route path="/parks" element={<ParksList />} />
          </Routes>
      </div>
  );
}

export default App;
