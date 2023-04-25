const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('pause')
            .setDescription('Pausa ou despausa o player'),
        async execute(interaction) {
            await interaction.deferReply();
            const connection = getVoiceConnection(interaction.guildId);

            if (connection.state.subscription.player._state.status != 'paused') {
                connection.state.subscription.player.pause();
                await interaction.editReply('paused');
            }
            else {
                connection.state.subscription.player.unpause();
                await interaction.editReply('unpaused');
            }
        }
}