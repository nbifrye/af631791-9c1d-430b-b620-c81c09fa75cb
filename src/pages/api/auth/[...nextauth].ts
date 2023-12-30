import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@/lib/unstorage-adapter";
import fsDriver from "unstorage/drivers/fs";

const storage = createStorage({
  driver: fsDriver({ base: "./tmp" }),
});

export const authOptions = {
  adapter: UnstorageAdapter(storage, { baseKeyPrefix: "testApp:" }),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

// @ts-ignore
export default NextAuth(authOptions);
