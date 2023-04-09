import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return ( 
    <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route exact path="/" element={<Home />}/>
        </Routes>
    </BrowserRouter>
  
  )
}

export default App;
