"use client";
import { SessionProvider } from "next-auth/react";

interface Props extends React.PropsWithChildren {}

export const Lib = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
