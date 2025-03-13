import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accountName: string;
    id: string ;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accountName: string;
    id: string;
  }
}
