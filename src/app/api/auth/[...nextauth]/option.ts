/* eslint-disable prettier/prettier */
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosConfig } from "@/api.config/axios.config";
import type { NextAuthOptions } from "next-auth";
import { cookies } from "next/headers";

export const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axiosConfig.post("/user/login", {
            email: credentials?.username,
            password: credentials?.password,
          });
          const user = res.data;
          cookies().set("token", user.token);
          if (res && user) {
            return { id: "id", access_token: user.token };
          }
          return null;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        token.access_token = (user as any).access_token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.access_token = token.access_token;
      }
      return session;
    },
  },
};
