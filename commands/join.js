const { SlashCommandBuilder } = require('discord.js');
const yts = require('yt-search');

let arrCola = {
    listCola:[]
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join')
        .setDescription('join <música>\nretorna 5 opções de busca')
        .addStringOption(option => 
            option.setName('música')
                .setDescription('texto para procurar música')),
    async execute(interaction) {
        (async () => {
            await interaction.deferReply();
            const r = await yts(interaction.options.getString('musica'));
            arrCola.listCola = r.videos.slice(0, 5);
            let str = "";
            i = 1;
            arrCola.listCola.map(item => {
                str += `/p ${i} - ${item.title}\n`;
                i++;
            });
            await interaction.editReply(str);
        })();
    }
, arrCola};