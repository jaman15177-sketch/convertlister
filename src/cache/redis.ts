import { createClient } from "redis";
import { ENV } from "../config/env";

const client = createClient({ url: ENV.REDIS_URL });
client.connect();

export const cache = {
  get: (key: string) => client.get(key),
  set: (key: string, value: string) => client.set(key, value),
};
