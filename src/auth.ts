import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import loginSchema from "./lib/schemas/loginSchema";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        accountName: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedCredentials = loginSchema.safeParse(credentials);
        if (!validatedCredentials.success) return null;
        const { data } = validatedCredentials;
        const user = await prisma.user.findUnique({
          where: {
            accountName: data.accountName,
          },
        });
        if (!user) return null;
        const isMatch = bcrypt.compare(data.password, user.password);
        if (!isMatch) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user && user.id) {
        token.id = user.id;
        token.accountName = user.accountName;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.accountName = token.accountName;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "ANY SECRET",
  adapter: PrismaAdapter(prisma),
});
