import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/produto.css";

const Produto = () => {
  const [formulario, setFormulario] = useState({
    nome: "",
    quantidade: 0,
    preco: 0,
    categoria: "",
    descricao: "",
    usuario: "",
    imagem: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [formularioEdicao, setFormularioEdicao] = useState({
    id: "",
    nome: "",
    quantidade: 0,
    preco: 0,
    categoria: "",
    descricao: "",
    usuario: "",
    imagem: "",
  });

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

  const carregarCategorias = () => {
    axios
      .get("https://backend-completo.vercel.app/app/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategorias(res.data.categorias || res.data))
      .catch((err) => console.log("Erro ao carregar categorias:", err));
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleChange = (e, tipoForm = "formulario") => {
    const { name, value } = e.target;
    tipoForm === "formulario"
      ? setFormulario({ ...formulario, [name]: value })
      : setFormularioEdicao({ ...formularioEdicao, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario) return alert("Usuário não encontrado para cadastrar produto.");
    const novoProduto = { ...formulario, usuario };

    axios
      .post("https://backend-completo.vercel.app/app/produtos", novoProduto, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Produto cadastrado com sucesso!");
        setFormulario({ nome: "", quantidade: 0, preco: 0, categoria: "", descricao: "", usuario: "", imagem: "" });
      })
      .catch((erro) => console.log("Erro ao criar produto:", erro));
  };

  const buscarProdutoPorId = async (id) => {
    try {
      const url = `https://backend-completo.vercel.app/app/produtos/${usuario}/`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const produto = response.data.find((p) => p._id === id);
      if (produto) {
        setFormularioEdicao({
          id: produto._id,
          nome: produto.nome,
          quantidade: produto.quantidade,
          preco: produto.preco,
          categoria: produto.categoria || "",
          descricao: produto.descricao || "",
          usuario: produto.usuario || "",
          imagem: produto.imagem || "",
        });
      } else {
        alert("Produto não encontrado.");
      }
    } catch (erro) {
      console.log("Erro ao buscar produto:", erro);
    }
  };

  const handleAtualizar = (e) => {
    e.preventDefault();
    if (!formularioEdicao.id) return alert("ID do produto não informado.");

    axios
      .put("https://backend-completo.vercel.app/app/produtos", formularioEdicao, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("Produto atualizado com sucesso!");
        setFormularioEdicao({ id: "", nome: "", quantidade: 0, preco: 0, categoria: "", descricao: "", usuario: "", imagem: "" });
      })
      .catch((erro) => console.log("Erro ao atualizar produto:", erro));
  };

  return (
    <div className="containerProd">
      <h1>Cadastro e Edição de Produto</h1>

      <div className="forms">
        <div>
          <h2>Cadastrar Novo Produto</h2>
          <form className="form_prod" onSubmit={handleSubmit}>
            <input type="text" name="nome" placeholder="Nome" value={formulario.nome} onChange={(e) => handleChange(e)} required />
            <input type="number" name="quantidade" placeholder="Quantidade" value={formulario.quantidade} onChange={(e) => handleChange(e)} required />
            <input type="number" step="0.01" name="preco" placeholder="Preço" value={formulario.preco} onChange={(e) => handleChange(e)} required />
            <select name="categoria" value={formulario.categoria} onChange={(e) => handleChange(e)} required>
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat.nome}>{cat.nome}</option>
              ))}
            </select>
            <input type="text" name="descricao" placeholder="Descrição" value={formulario.descricao} onChange={(e) => handleChange(e)} />
            <input type="text" name="usuario" placeholder="Usuário" value={usuario} readOnly />
            <input type="text" name="imagem" placeholder="Imagem (URL)" value={formulario.imagem} onChange={(e) => handleChange(e)} />
            <button className="cadastrar" type="submit">Cadastrar</button>
          </form>
        </div>

        <div className="atulizarProduto">
          <h2>Atualizar Produto</h2>
          <form className="form_prod" onSubmit={handleAtualizar}>
            <input type="text" placeholder="ID do produto" value={formularioEdicao.id} onChange={(e) => {
              const id = e.target.value;
              setFormularioEdicao({ ...formularioEdicao, id });
              if (id.length === 24) buscarProdutoPorId(id);
            }} required />
            <input type="text" name="nome" placeholder="Nome" value={formularioEdicao.nome} onChange={(e) => handleChange(e, "formularioEdicao")} required />
            <input type="number" name="quantidade" placeholder="Quantidade" value={formularioEdicao.quantidade} onChange={(e) => handleChange(e, "formularioEdicao")} required />
            <input type="number" step="0.01" name="preco" placeholder="Preço" value={formularioEdicao.preco} onChange={(e) => handleChange(e, "formularioEdicao")} required />
            <select name="categoria" value={formularioEdicao.categoria} onChange={(e) => handleChange(e, "formularioEdicao")} required>
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat._id} value={cat.nome}>{cat.nome}</option>
              ))}
            </select>
            <input type="text" name="descricao" placeholder="Descrição" value={formularioEdicao.descricao} onChange={(e) => handleChange(e, "formularioEdicao")} />
            <input type="text" name="usuario" placeholder="Usuário" value={formularioEdicao.usuario} onChange={(e) => handleChange(e, "formularioEdicao")} required />
            <input type="text" name="imagem" placeholder="Imagem (URL)" value={formularioEdicao.imagem} onChange={(e) => handleChange(e, "formularioEdicao")} />
            <button className="Atualizar" type="submit">Atualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Produto;
