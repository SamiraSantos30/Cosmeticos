// Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/navebar.css";

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const token = localStorage.getItem("ALUNO_ITE");
  const navigate = useNavigate();

  const usuario = (() => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.usuario || "";
    } catch {
      return "";
    }
  })();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await fetch(
          `https://backend-completo.vercel.app/app/produtos/${usuario}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };
    fetchProdutos();
  }, [usuario]);

  const handleSelecionar = (produto) => {
    const carrinho = JSON.parse(localStorage.getItem("CARRINHO") || "[]");
    const index = carrinho.findIndex((p) => p.nome === produto.nome);
    if (index >= 0) {
      carrinho[index].quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
    localStorage.setItem("CARRINHO", JSON.stringify(carrinho));
  };

  return (
    <div className="home">
      <h2>Produtos disponíveis</h2>
      <div className="lista-produtos">
        {produtos.map((produto) => (
          <div key={produto.id} className="card-produto" onClick={() => handleSelecionar(produto)}>
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="imagem-produto"
              />
            )}
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <strong>R$ {produto.preco.toFixed(2)}</strong>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/confirmacao")}>Ver Carrinho</button>
    </div>
  );
};

export default Home;
