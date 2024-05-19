import * as z from "zod";

const envSchema = z.object({
  DISCORD_BOT_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
