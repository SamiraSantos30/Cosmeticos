import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/produto.css";

const Dashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const token = localStorage.getItem("ALUNO_ITE");

  const pegarUsuarioDoToken = () => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.usuario || "";
    } catch {
      return "";
    }
  };

  const usuario = pegarUsuarioDoToken();

  const listarProdutos = async () => {
    if (!usuario) return;
    try {
      const response = await axios.get(`https://backend-completo.vercel.app/app/produtos/${usuario}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(Array.isArray(response.data) ? response.data : []);
    } catch (erro) {
      console.log("Erro ao buscar produtos:", erro);
    }
  };

  const prodDelete = (id) => {
    if (!window.confirm("Deseja realmente deletar este produto?")) return;
    axios
      .delete("https://backend-completo.vercel.app/app/produtos", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      })
      .then(() => {
        alert("Produto deletado!");
        listarProdutos();
      })
      .catch((erro) => console.log("Erro ao deletar produto:", erro));
  };

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div className="containerProd">
      <h1>Produtos</h1>
      <table className="tabela-produtos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto._id}>
              <td>{produto._id}</td>
              <td>
                <img src={produto.imagem} alt={produto.nome} width="60" />
              </td>
              <td>{produto.nome}</td>
              <td>{produto.categoria}</td>
              <td>R$ {produto.preco}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.descricao}</td>
              <td>{produto.usuario}</td>
              <td>
                <button onClick={() => prodDelete(produto._id)}>❌ Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

