import { MongoClient } from "mongodb";
import { MONGO_URL_CONNECT } from "./environment-variables";
export async function connectDatabase() {
  const client = await MongoClient.connect(MONGO_URL_CONNECT);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  console.log("--------------------");
  const documents = await db.collection(collection).find().sort(sort).toArray();
  console.log(documents);

  return documents;
}
