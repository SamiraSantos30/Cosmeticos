import { useEffect, useState } from "react";
import axios from "axios";
import "../css/pedido.css";

const Pedido = () => {
  const [vendas, setVendas] = useState([]);
  const [carregando, setCarregando] = useState(true);
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

  const fetchVendas = async () => {
    if (!usuario) {
      console.error("Usuário não encontrado no token.");
      setCarregando(false);
      return;
    }

    try {
      const res = await fetch(
        `https://backend-completo.vercel.app/app/venda?usuario=${usuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Erro ao buscar vendas.");

      const data = await res.json();
      setVendas(Array.isArray(data) ? data : data.vendas || []);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      setVendas([]);
    } finally {
      setCarregando(false);
    }
  };

  const prodDelete = (id) => {
    if (!window.confirm("Deseja realmente deletar esta venda?")) return;

    axios
      .delete("https://backend-completo.vercel.app/app/venda", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { id },
      })
      .then(() => {
        alert("Venda deletada!");
        fetchVendas();
      })
      .catch((erro) => console.log("Erro ao deletar venda:", erro));
  };

  useEffect(() => {
    fetchVendas();
  }, [token, usuario]);

  return (
    <div className="container-vendas">
      <h1>Vendas Concluídas</h1>

      {carregando ? (
        <p>Carregando vendas...</p>
      ) : vendas.length === 0 ? (
        <p>Nenhuma venda encontrada.</p>
      ) : (
        <table className="tabela-vendas">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Data</th>
              <th>Produtos</th>
              <th>Total</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => {
              const total = venda.produtos.reduce(
                (acc, p) => acc + p.quantidade * p.preco,
                0
              );

              return (
                <tr key={venda._id}>
                  <td>{venda.nomeCliente}</td>
                  <td>{new Date(venda.data).toLocaleDateString()}</td>
                  <td>
                    <ul className="lista-produtos">
                      {venda.produtos.map((p, i) => (
                        <li key={i}>
                          {p.nome} ({p.quantidade} x R$ {p.preco.toFixed(2)}) ={" "}
                          R$ {(p.quantidade * p.preco).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>R$ {total.toFixed(2)}</td>
                  <td>
                    <button onClick={() => prodDelete(venda._id)}>❌</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Pedido;
