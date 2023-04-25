const { SlashCommandBuilder } = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const client = require('../app')


module.exports = {
    data: new SlashCommandBuilder()
            .setName('sai')
            .setDescription('O bot sai do canal de voz'),
        async execute(interaction) {
            await interaction.deferReply();
            let botIsInChannel = false;
            const voiceChannels = (await interaction.guild.channels.fetch()).filter(channel => channel.type === 2);

            let members = [];
            voiceChannels.map((channel) =>
                channel.members.map((member) => {
                        members.push({
                            id: member.id,
                            nickname: member.nickname,
                            username: member.user.username,
                            channel: channel.name,
                            channelid: channel.id
                        });
                    })
            );

            members.map(member => {
                if (member.id == client.user.id) {
                    botIsInChannel = true;
                }
            });

            if (!botIsInChannel) {
                interaction.editReply('não estou em canal');
                return;
            }
            interaction.editReply("vo lembra");
            const connection = getVoiceConnection(interaction.guildId);
            connection.disconnect();
        }
}