import { Client, GatewayIntentBits, Partials } from "discord.js";
import env from "../models/env";

let client: Client<boolean> | undefined = undefined;

const getClient = async () => {
  if (client) return client;
  client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User],
  });
  await client.login(env.DISCORD_BOT_TOKEN);
  return client;
};

export default getClient;
