// backend/server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// simulação de "banco de dados" em memória
let usuarios = [];

// rota para registrar usuário
app.post("/api/register", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos!" });
  }

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(400).json({ message: "Usuário já cadastrado!" });
  }

  usuarios.push({ email, senha });
  return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
});

// rota para login
app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
  if (!usuario) {
    return res.status(401).json({ message: "Email ou senha incorretos!" });
  }

  return res.json({ message: `Bem-vindo, ${email}!` });
});

// rota para ver todos os usuários
app.get("/api/usuarios", (req, res) => {
  res.json(usuarios);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
