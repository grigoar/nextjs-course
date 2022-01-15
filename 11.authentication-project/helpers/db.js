import { MongoClient } from "mongodb";
import { MONGO_URL_CONNECT } from "./environment-variables";

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGO_URL_CONNECT);

  return client;
}
