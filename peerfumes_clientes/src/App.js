import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./componentes/Home";
import Confirmacao from "./componentes/Carrinho";
import Carrinho from "./componentes/Confirmacao";
import "./css/navebar.css";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="logo-container">
        <span className="brand-name">Fashion </span>
      </div>

      <ul className="nav-links">
        <li>
          <Link to="/" className={currentPath === "/" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/confirmacao" className={currentPath === "/confirmacao" ? "active" : ""}>Carrinho</Link>
        </li>
    
        <li>
          <Link to="/carrinho" className={currentPath === "/carrinho" ? "active" : ""}>Confirmação</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrinho" element={<Confirmacao />} />
            <Route path="/confirmacao" element={<Carrinho />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
