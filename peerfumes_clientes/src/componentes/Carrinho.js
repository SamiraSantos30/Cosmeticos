import React, { useState } from "react";
import "../css/conformacao.css"; 

const token = localStorage.getItem("ALUNO_ITE"); 

const Carrinho = () => {
  const [nomeCliente, setNomeCliente] = useState("");
  const produtos = JSON.parse(localStorage.getItem("CARRINHO") || "[]");

  const usuario = (() => {
    if (!token) return "";
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.usuario || "";
    } catch {
      return "";
    }
  })();

  const total = produtos.reduce(
    (acc, p) => acc + p.quantidade * p.preco,
    0
  );

  const finalizarPedido = async () => {
    if (!nomeCliente) return alert("Informe o nome do cliente.");
    if (produtos.length === 0) return alert("Carrinho vazio.");

    const novaVenda = {
      nomeCliente,
      data: new Date().toISOString().split("T")[0],
      produtos,
      usuario,
    };

    try {
      const res = await fetch(
        "https://backend-completo.vercel.app/app/venda",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(novaVenda),
        }
      );

      if (res.ok) {
        alert("Pedido finalizado!");
        localStorage.removeItem("CARRINHO");
        setNomeCliente("");
      } else {
        alert("Erro ao finalizar pedido.");
      }
    } catch (err) {
      console.error("Erro:", err);
    }
  };

  return (
    <div className="carrinho">
      <h2>Finalizar Compra</h2>
      <label>Nome do Cliente:</label>
      <input
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
      />
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={finalizarPedido}>Confirmar Pedido</button>
    </div>
  );
};

export default Carrinho;

