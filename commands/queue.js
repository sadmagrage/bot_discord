const { SlashCommandBuilder } = require('discord.js');
const { songs } = require('./p');


module.exports = {
    data: new SlashCommandBuilder()
            .setName('queue')
            .setDescription('return queue songs'),
        async execute(interaction) {
            await interaction.deferReply();

            let str = "";
            let i = 1;
            songs.listSongs.map(song => {
                if (songs.listSongs[0].url === song.url) {
                    str += `Current song: ${song.title}\n`;
                }
                else {
                    str += `${i}: ${song.title}\n`;
                    i++;
                }
            });

            await interaction.editReply(str);
        }
            
}