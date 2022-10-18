import { ObjectId } from "bson";

const { getMongoCollection } = require("./mongodb");

const DATABASE = "mongo-bytes4gamers";
const USER_COLLECTION = "tables";

async function addTable(table) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.insertOne(table);
  return result.insertedId;
}
async function getTableById(id) {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.findOne({ _id: ObjectId(id) });
  return result;
}
async function getAllTables() {
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.find().toArray();
  return result;
}
async function updateTable(id, data) {
  console.log(id, data);
  const collection = await getMongoCollection(DATABASE, USER_COLLECTION);
  const result = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { ...data } }
  );
  return result;
}

export { getTableById, getAllTables, updateTable, addTable };
