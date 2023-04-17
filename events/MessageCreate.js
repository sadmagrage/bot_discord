const { Events } = require('discord.js');
const client = require('../app');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {
        if (interaction.author.id === client.user.id) return;
    
        const content = interaction.content.toLowerCase();

        if (content === 'flw') {
            await interaction.reply('flw td nosso');
        }
    }
};