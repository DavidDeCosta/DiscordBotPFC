import axios from 'axios'
import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js'

const getPokemonData = async() => {
    const randomId = Math.floor(Math.random() * 151) + 1 //the original 151 pokemon
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    return response.data;
}

export const command = new SlashCommandBuilder().setName('pokemon').setDescription('Guess that Pokemon!');

export const execute = async(interaction : ChatInputCommandInteraction)=>{
    try{
        const pokemonData = await getPokemonData();
        const pokemonName = pokemonData.name.toLowerCase();
        const pokemonImage = pokemonData.sprites.front_default;

        await interaction.reply({
            content: 'Guess that Pokemon!',
            files: [pokemonImage]
        });

        const maxGuesses = 5;
        let guessCount =0;

        const filter = (response: any) =>{
            return response.author.id == interaction.user.id;
        }

        const collector = interaction.channel?.createMessageCollector({filter,time:15000}); //15 seconds

        collector?.on('collect',async(response)=>{
            guessCount++;
            if(response.content.toLowerCase()===pokemonName)
            {
                await response.reply('Correct!');
                collector.stop();
            }
            else if(response.content.toLowerCase() === 'stop')
            {
                await response.reply('Game ended.');
                collector.stop();
            }
            else if(guessCount>=maxGuesses){
                await response.reply('Max guesses reached! Game over.');
                collector.stop();
            }
            else
            {
                await response.reply('Wrong...try again?');
            }
        });
            
            collector?.on('end', async(collected) =>{
                if (collected.size === 0) {
                    await interaction.followUp(`Time's up! The correct answer was: **${pokemonName}**`);
                }
            });
    }catch(error){
        console.error(error);
        await interaction.reply('There was an error fetching the Pokemon data.')
    }
};

