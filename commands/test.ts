import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

// Command Builder export
export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

// Execute function export
export const execute = async (interaction: ChatInputCommandInteraction) => {
  await interaction.reply("Pong");
};
