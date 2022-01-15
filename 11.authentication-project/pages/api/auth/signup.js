import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      return;
    }
    try {
      const client = await connectToDatabase();

      const db = client.db();

      const existingUser = await db
        .collection("users")
        .findOne({ email: email });

      if (existingUser) {
        res.status(422).json({ message: "User exists already!" });
        client.close();
        return;
      }
      const hashPass = await hashPassword(password);

      const result = await db.collection("users").insertOne({
        email: email,
        password: hashPass,
      });
      if (!result) {
        throw new Error("The user was not created! Please try again!");
      } else {
        console.log("the user was created!");
      }
      client.close();
    } catch (err) {
      console.log(err.message);
    }

    res.status(201).json({ message: "Created user!" });
  }
}

export default handler;
