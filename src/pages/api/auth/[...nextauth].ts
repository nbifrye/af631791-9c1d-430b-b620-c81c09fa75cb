import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { createStorage } from "unstorage";
import { UnstorageAdapter } from "@/lib/unstorage-adapter";
import redisJSONDriver from "@/lib/redis-json-driver";

const storage = createStorage({
  driver: redisJSONDriver({ username: "default" }),
});

export const authOptions = {
  adapter: UnstorageAdapter(storage, {
    baseKeyPrefix: "testApp:",
    useItemRaw: true,
  }),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

// @ts-ignore
export default NextAuth(authOptions);
