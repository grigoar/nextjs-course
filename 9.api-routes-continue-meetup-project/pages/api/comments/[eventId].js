import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    //add server-side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
      eventId,
    };
    console.log(newComment);
    let result;
    try {
      result = await insertDocument(client, "comments", newComment);
      client.close();
      newComment.id = result.insertedId;

      await res.status(201).json({
        message: "Added comment. ",
        comment: newComment,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Inserting comment to the database failed!" });
    }
  }

  if (req.method === "GET") {
    let documents;
    try {
      documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      // console.log();
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;
