// entrypoint file for all commands
import { REST, Routes } from "discord.js";
import env from "../models/env";
import * as test from "./test";
import * as pokemon from './pokemon'

const registerCommands = async () => {
  const commands = [test.command, pokemon.command];

  const rest = new REST({ version: "10" }).setToken(env.DISCORD_BOT_TOKEN);

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(env.DEMO_BOT_CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};

export default registerCommands;
