/* eslint-disable prettier/prettier */
import NextAuth from "next-auth";
import { nextOptions } from "./option";

const handler = NextAuth(nextOptions);

export { handler as GET, handler as POST };
