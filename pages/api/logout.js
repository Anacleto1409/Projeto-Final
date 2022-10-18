import { insertUser } from "../../src/backend-data/authentication";
import { addSession, deleteSession, getSessionByToken } from "../../src/backend-data/sessions";
import {
  getUserByEmail,
  getUserByUsername,
} from "../../src/backend-data/users";
import { validateFields } from "../../src/backend-services/validations";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { token } = req.body;
    await deleteSession(token);
    res.status(200).json({ mensagem: "Sessão terminada."});
  }
}
