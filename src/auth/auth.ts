import NextAuth from "next-auth";

export const {handlers, signIn, auth} = NextAuth({
    providers: [],
});