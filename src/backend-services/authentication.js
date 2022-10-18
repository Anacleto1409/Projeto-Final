const express = require("express");
const { ObjectId } = require("mongodb");
import { insertUser } from "../backend-data/authentication";
// const { addSession, getSessionByToken } = require("./data/sessions");
// const { addUser, getUserByEmail, getUserById } = require("./data/users");
// const { validateFields } = require("./services/validations");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// app.post("/signup", async (req, res) => {
async function signup(u) {
  const user = {
    email,
    password,
    passwordConfirmation,
    acceptsTerms,
    acceptsCommunications,
  };
  // = req.body;
  await insertUser({
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation,
    acceptsTerms: acceptsTerms,
    acceptsCommunications: acceptsCommunications,
  });

  const validation = validateFields(req.body);
  if (validation.success) {
    const id = await addUser({
      email,
      password,
      passwordConfirmation,
      acceptsTerms,
      acceptsCommunications,
    });
    res.status(201).json({
      message: "Utilizador Criado com Sucesso!",
      _id: id,
    });
  } else {
    res.status(400).json({
      message: "Os dados introduzidos não são válidos.",
      errors: validation.errors,
    });
  }
  return user;
}

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await getUserByEmail(email);
//   if (!user) {
//     return res.status(404).json({
//       message: "O utilizador não foi encontrado!",
//     });
//   }
//   if (user.password !== password) {
//     return res.status(401).json({
//       message: "A password introduzida é inválida!",
//     });
//   }

//   const token = await addSession(user._id);
//   res.status(200).json({ token });
// });

// app.get("/user", async (req, res) => {
//   const token = req.header("authorization");
//   if (!token) {
//     return res.status(401).json({
//       message: "Não foi enviado o token de autenticação!",
//     });
//   }
//   let session;
//   if (ObjectId.isValid(token)) {
//     session = await getSessionByToken(token);
//   }
//   if (!session) {
//     return res.status(403).json({
//       message: "Não existe nenhuma sessão com o token indicado!",
//     });
//   }

//   const user = await getUserById(session.userId);
//   res.status(200).json({
//     _id: user._id,
//     email: user.email,
//     acceptsTerms: user.acceptsTerms,
//     acceptsCommunications: user.acceptsCommunications,
//   });
// });

// app.get("/user/:id", async (req, res) => {
//   const token = req.header("authorization");
//   const id = req.params.id;
//   if (!token) {
//     return res.status(401).json({
//       message: "Não foi enviado o token de autenticação!",
//     });
//   }
//   let session;
//   if (ObjectId.isValid(token)) {
//     session = await getSessionByToken(token);
//   }
//   if (!session) {
//     return res.status(403).json({
//       message: "Não existe nenhuma sessão com o token indicado!",
//     });
//   }

//   // const user = await getUserById(session.userId)
//   res.status(200).json({
//     sameUser: session.userId.toHexString() == id,
//   });
// });

app.listen(PORT, () => console.log("À escuta na porta " + PORT));

export { signup };
