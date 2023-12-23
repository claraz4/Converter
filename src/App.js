import React from "react"
import "./styles.css";
import Home from "../src/components/Home";
import BinaryToBCD from "../src/components/BinaryToBCD";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import BaseConverter from "./components/BaseConverter";
import BinaryToExcess3 from "./components/BinaryToExcess3";

export default function App() {
  return (
    <div>
      <Router>
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/base-converter" element={<BaseConverter />} />    
              <Route exact path="/binary-to-bcd" element={<BinaryToBCD />} />    
              <Route exact path="/binary-to-excess3" element={<BinaryToExcess3 />} />    
          </Routes>
      </Router>
    </div>
  );
}