import { defineDriver } from "unstorage";
import { createClient } from "redis";
import type { RedisClientType, RedisClientOptions } from "redis";

export default defineDriver((options: RedisClientOptions) => {
  let redisClient: RedisClientType;
  const getRedisClient = async () => {
    if (!redisClient) {
      // @ts-ignore
      redisClient = await createClient(options).connect();
      return redisClient;
    }
    if (!redisClient.isReady) await redisClient.connect();
    return redisClient;
  };

  return {
    name: "redis-json-driver",
    options,
    async hasItem(key, _opts) {
      return Boolean(await (await getRedisClient()).exists(key));
    },
    async getItem(key, _opts) {
      const value = await (await getRedisClient()).get(key);
      return value ?? null;
    },
    async getItemRaw(key, _opts) {
      const value = await (await getRedisClient()).json.get(key);
      return value ?? null;
    },
    async setItem(key, value, _opts) {
      let ttl = _opts?.ttl;
      if (ttl) {
        await (await getRedisClient()).set(key, value);
        await (await getRedisClient()).expire(key, ttl);
      } else {
        await (await getRedisClient()).set(key, value);
      }
    },
    async setItemRaw(key, value, _opts) {
      let ttl = _opts?.ttl;
      if (ttl) {
        await (await getRedisClient()).json.set(key, "$", value);
        await (await getRedisClient()).expire(key, ttl);
      } else {
        await (await getRedisClient()).json.set(key, "$", value);
      }
    },
    async removeItem(key, _opts) {
      await (await getRedisClient()).del(key);
    },
    async getKeys(base, _opts) {
      return await (await getRedisClient()).keys("*");
    },
  };
});
