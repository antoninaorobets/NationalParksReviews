
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/user";
import LoginForm from "./LoginForm";
import MyParks from "./MyParks";
import ParkInfo from "./ParkInfo";
import ParksList from "./ParksList";
import SignUpForm from "./SignUpForm";
import TopBar from "./TopBar";

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
