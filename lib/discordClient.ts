import { Client, GatewayIntentBits } from "discord.js";

let client: any = undefined;

const getClient = async () => {
  if (client) return client;
  client = new Client({ intents: [GatewayIntentBits.Guilds] });
  return client;
};

export default getClient;
