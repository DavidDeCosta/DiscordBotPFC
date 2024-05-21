import * as z from "zod";

const envSchema = z.object({
  DISCORD_BOT_TOKEN: z.string(),
  DEMO_BOT_CLIENT_ID: z.string().default("1241774858304749589"),
});

const env = envSchema.parse(process.env);

export default env;
