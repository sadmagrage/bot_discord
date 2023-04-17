const { SlashCommandBuilder } = require('discord.js');
const Timer = require('../modules/Timer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('progress')
        .setDescription('progresso ate entao'),
    async execute(interaction) {
        await interaction.reply(Timer());
    }
}