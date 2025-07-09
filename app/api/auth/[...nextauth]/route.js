import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const handler = NextAuth({
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
        token.role = user.role;   // <-- Rolle für Berechtigungen
        token.id = user.id;       // <-- User ID falls du sie brauchst
                console.log("JWT Callback:", token.role);
      }
      return token;
    },
    async session({ session, token }) {
      // Wird immer beim Session-Zugriff aufgerufen
      if (token) {
        session.user.role = token.role; // <-- jetzt steht in session.user.role die Rolle!
        session.user.id = token.id;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
