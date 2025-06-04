import React, { useState } from "react";
import axios from "axios";
import "../css/registro.css"; 

const RegistrosUse = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [mensagem, setMensagem] = useState("");

  const Cadastro = async () => {
    const url = "https://backend-completo.vercel.app/app/registrar";

    try {
      const response = await axios.post(url, {
        usuario: usuario,
        senha: senha,
        confirma: confirma,
      });

      if (response.data.error) {
        alert(`Erro: ${response.data.error}`);
      } else {
        alert(`Usuário ${response.data.usuario} cadastrado com sucesso!`);
      }
    } catch (error) {
      setMensagem("Erro ao registrar usuário. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-login">
        <h1>Registrar Usuário</h1>
        <input
          type="text"
          className="user-input"
          placeholder="RA do aluno"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          className="user-input"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          className="user-input"
          placeholder="Confirmar senha"
          value={confirma}
          onChange={(e) => setConfirma(e.target.value)}
        />
        <button className="login" onClick={Cadastro}>Cadastrar</button>
        <p className="message">{mensagem}</p>
      </div>
    </div>
  );
};

export default RegistrosUse;
