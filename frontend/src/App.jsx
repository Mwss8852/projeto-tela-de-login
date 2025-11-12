import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [modo, setModo] = useState("login"); // "login" ou "register"

  // Buscar usuários cadastrados
  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios")
      .then((res) => res.json())
      .then(setUsuarios)
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const rota =
      modo === "login"
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/register";

    try {
      const resposta = await fetch(rota, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();
      alert(data.message);

      if (resposta.ok && modo === "register") {
        setUsuarios((prev) => [...prev, { email }]);
      }

      setEmail("");
      setSenha("");
    } catch (error) {
      alert("Erro ao conectar com o servidor!");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="titulo">Tela de {modo === "login" ? "Login" : "Cadastro"}</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>

      <p>
        {modo === "login" ? (
          <>
            Não tem conta?{" "}
            <span className="link" onClick={() => setModo("register")}>
              Cadastre-se
            </span>
          </>
        ) : (
          <>
            Já tem conta?{" "}
            <span className="link" onClick={() => setModo("login")}>
              Fazer login
            </span>
          </>
        )}
      </p>

      <div className="usuarios">
        <h2>Usuários cadastrados:</h2>
        <ul>
          {usuarios.map((u, i) => (
            <li key={i}>{u.email}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
