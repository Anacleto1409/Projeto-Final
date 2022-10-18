import { insertUser } from "../../src/backend-data/authentication";
import { getAllTables } from "../../src/backend-data/tables";
import { validateFields } from "../../src/backend-services/validations";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ tables: await getAllTables() });
  }
}
