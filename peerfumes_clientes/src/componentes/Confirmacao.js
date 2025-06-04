// Confirmacao.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/carrinho.css";

const Confirmacao = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState(
    JSON.parse(localStorage.getItem("CARRINHO") || "[]")
  );

  const atualizarQuantidade = (index, quantidade) => {
    const novos = [...produtos];
    if (quantidade <= 0) {
      novos.splice(index, 1);
    } else {
      novos[index].quantidade = quantidade;
    }
    setProdutos(novos);
    localStorage.setItem("CARRINHO", JSON.stringify(novos));
  };

  const total = produtos.reduce(
    (acc, p) => acc + p.quantidade * p.preco,
    0
  );

  return (
    <div className="confirmacao">
      <h2>Confirme seus produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Preço</th>
            <th>Total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i}>
              <td>{p.nome}</td>
              <td>
                <input
                  type="number"
                  value={p.quantidade}
                  onChange={(e) => atualizarQuantidade(i, +e.target.value)}
                />
              </td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td>R$ {(p.quantidade * p.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => atualizarQuantidade(i, 0)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={() => navigate("/carrinho")}>Finalizar</button>
    </div>
  );
};

export default Confirmacao;
