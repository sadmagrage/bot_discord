const { SlashCommandBuilder } = require('discord.js');
const Timer = require('../modules/Timer');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('progress')
        .setDescription('Timer misterioso, o quê será que é ?'),
    async execute(interaction) {
        await interaction.reply(Timer());
    }
}