import { Interaction } from "discord.js";
import "dotenv/config";
import registerCommands from "./commands/test";
import getClient from "./lib/discordClient";
import env from "./models/env";

const main = async () => {
  await registerCommands();
  const client = await getClient();

  client.on("ready", async () => {
    console.log("bot is running");
    await client.user.setActivity("Testing");
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });

  client.login(env.DISCORD_BOT_TOKEN);
};

main();
