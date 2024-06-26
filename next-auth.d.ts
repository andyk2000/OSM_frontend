/* eslint-disable prettier/prettier */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string;
    error?: string;
    access_token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
  }
}
