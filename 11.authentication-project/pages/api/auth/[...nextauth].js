import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

//this return a function after exectuing the NextAuth(vuntion)
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      // credentials:{}
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }
        console.log(user);
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        console.log(isValid);
        if (!isValid) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return {
          email: user.email,
        };
      },
    }),
  ],
});
