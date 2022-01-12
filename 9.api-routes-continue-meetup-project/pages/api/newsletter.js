import { insertDocument, connectDatabase } from "../../helpers/db-util";

async function handler(req, res) {
  //   console.log(req);
  if (req.method === "POST") {
    const userEmail = req.body.email;
    // console.log(email);
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }
    // MongoClient.connect(MONGO_URL_CONNECT).then((client) => {
    //     const db = client.db();

    //     return db.collection("emails").insertOne({ email: userEmail });
    //   });
    let client;
    try {
      client = await connectDatabase();
      console.log(client);
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting to the database failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
