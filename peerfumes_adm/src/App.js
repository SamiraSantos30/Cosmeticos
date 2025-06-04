import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";

import Dashboard from "./componentes/Home";
import Produtos from "./componentes/Produto";
import Pedidos from "./componentes/Pedido";
import Login from "./componentes/Login";
import RegistrosUs from "./componentes/RegistrosUs";
import Categoria from "./componentes/Categoriass";
import logo from "./componentes/img/duda.jpeg";

const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#rgba", 
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "0.75rem 1rem",
    borderRadius: "4px",
    marginBottom: "0.5rem",
    transition: "background-color 0.3s",
  },
  linkHover: {
    backgroundColor: "#fff",
    color: "#ff007f",
  },
  content: {
    marginLeft: "220px",
    padding: "2rem",
    flex: 1,
  },
};

const Middleware = () => {
  const logado = localStorage.getItem("ALUNO_ITE");
  return logado ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  const [activeLink, setActiveLink] = React.useState("");

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <BrowserRouter>
      <div style={styles.app}>
        <nav style={styles.sidebar}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "200px", marginBottom: "1rem", borderRadius: "10px" }}
          />

          <Link
            to="/"
            style={{
              ...styles.link,
              ...(activeLink === "/" ? styles.linkHover : {}),
            }}
            onClick={() => handleLinkClick("/")}
          >
            Produto
          </Link>
          <Link
            to="/produtos"
            style={{
              ...styles.link,
              ...(activeLink === "/produtos" ? styles.linkHover : {}),
            }}
            onClick={() => handleLinkClick("/produtos")}
          >
            Cadastro de Produtos
          </Link>
          <Link
            to="/categoria"
            style={{
              ...styles.link,
              ...(activeLink === "/categoria" ? styles.linkHover : {}),
            }}
            onClick={() => handleLinkClick("/categoria")}
          >
            Categoria
          </Link>
          <Link
            to="/pedidos"
            style={{
              ...styles.link,
              ...(activeLink === "/pedidos" ? styles.linkHover : {}),
            }}
            onClick={() => handleLinkClick("/pedidos")}
          >
            Pedidos
          </Link>
          <Link
            to="/registro"
            style={{
              ...styles.link,
              ...(activeLink === "/registro" ? styles.linkHover : {}),
            }}
            onClick={() => handleLinkClick("/registro")}
          >
            RegistroUs
          </Link>
        </nav>

        <div style={styles.content}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<RegistrosUs />} />

            <Route element={<Middleware />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/categoria" element={<Categoria />} />
              <Route path="/pedidos" element={<Pedidos />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
