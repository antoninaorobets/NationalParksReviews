
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm"
import TopBar from "./TopBar";
import ParksList from "./ParksList"
import ParkInfo from "./ParkInfo";
import { UserProvider } from "../context/user"
import MyParks from "./MyParks";
import Test from "./Test";

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Test />
        <UserProvider>
          <TopBar />
          <Routes>
            <Route path="/login" element={< LoginForm />} />
            <Route path="/signup" element={< SignUpForm />} />
            <Route path="/parks/:id" element={<ParkInfo />} />
            <Route path="/parks/my_parks" element={<MyParks />} />
            <Route path="/parks" element={<ParksList />} />
          </Routes>
        </UserProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;