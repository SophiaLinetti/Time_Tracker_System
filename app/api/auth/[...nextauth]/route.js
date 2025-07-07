import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // fake-user (nur für demo)
        if (credentials.username === "admin" && credentials.password === "admin") {
          return { id: 1, name: "Admin" }
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
