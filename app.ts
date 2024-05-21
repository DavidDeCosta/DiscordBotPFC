import { ActivityType } from "discord.js";
import "dotenv/config";
import registerCommands from "./commands";
import * as test from "./commands/test";
import getClient from "./lib/discordClient";

const main = async () => {
  await registerCommands();
  const client = await getClient();

  client.once("ready", async () => {
    console.log("bot is running");
    client.user?.setActivity("Up to Something...", {
      type: ActivityType.Playing,
    });
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === "ping") {
      return test.execute(interaction);
    }
  });

  client.on("messageCreate", (message) => {
    message.react("🔥");
  });
};

main();
