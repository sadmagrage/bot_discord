const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const { arrCola } = require('./join');
const ytdl = require('ytdl-core');

let songs = {
    listSongs: []
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('p')
        .setDescription('p <num>\nseleciona 1 das 5 opções')
        .addIntegerOption(option => 
            option.setName('num')
                .setDescription('tocar música')),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            
            (async () => {                
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

                const selector = interaction.options.getInteger('num');
                if (songs.listSongs.length === 0) {
                    songs.listSongs.push({
                        url: arrCola.listCola[selector - 1].url,
                        title: arrCola.listCola[selector - 1].title
                    });

                    await interaction.editReply('bora');
                    
                    const player = createAudioPlayer();
                    player.play(createAudioResource(ytdl(songs.listSongs[0].url, {filter: 'audioonly'})));
                    
                    const connection = joinVoiceChannel({
                        channelId: channel_id,
                        guildId: interaction.guildId,
                        adapterCreator: interaction.guild.voiceAdapterCreator,
                    });
                    connection.subscribe(player);

                    const x = setInterval(() => {
                        if (player.state.status === 'idle') {
                            songs.listSongs.shift();
                            if (songs.listSongs.length != 0) {
                                player.play(createAudioResource(ytdl(songs.listSongs[0].url, {filter: 'audioonly'})));
                                (async () => {
                                    interaction.followUp(`playing ${songs.listSongs[0].title}`);
                                });
                            }
                            else {
                                interaction.followUp('to saindo');
                                connection.disconnect();
                                clearInterval(x);
                            }
                        }
                    }, 1000);
                }
                else {
                    await interaction.editReply('enqueued');
                    songs.listSongs.push({
                        url: arrCola.listCola[selector - 1].url,
                        title: arrCola.listCola[selector - 1].title
                    });
                }
                arrCola.listCola = [];
            })();
        } 
        catch (error) {
            console.error(error);
        }
    }
, songs};