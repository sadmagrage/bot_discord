const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
            .setName('come')
            .setDescription('call bot to new voice channel'),
        async execute(interaction) {
            await interaction.deferReply();
            let channel_id;
                        
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
                if (member.id == interaction.user.id) {
                    channel_id = member.channelid;
                }
            });

            const connection = joinVoiceChannel({
                channelId: channel_id,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            await interaction.editReply('to colante');
        }
}