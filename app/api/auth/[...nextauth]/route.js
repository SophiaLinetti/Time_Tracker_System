import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Suche User anhand der Email (username-Feld)
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.username
          }
        });
        // Wenn User gefunden & Passwort stimmt (Achtung: aktuell Klartext, später hashen!)
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
          };
        }
        return null;
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // Weitere Provider hier ...
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Wird beim Login/jwt-refresh aufgerufen
      if (user) {
        token.role = user.role;
        token.id = user.id;       
                console.log("JWT Callback:", token.role);
      }
      return token;
    },
    async session({ session, token }) {
      // Wird immer beim Session-Zugriff aufgerufen
      if (token) {
        session.user.role = token.role; 
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
