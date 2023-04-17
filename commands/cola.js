const { SlashCommandBuilder } = require('discord.js');
const yts = require('yt-search');

let arrCola = {
    listCola:[]
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cola')
        .setDescription('cola <musica>\nretorna 5 opcoes de busca')
        .addStringOption(option => 
            option.setName('musica')
                .setDescription('texto para procurar musica')),
    async execute(interaction) {
        (async () => {
            await interaction.deferReply();
            const r = await yts(interaction.options.getString('musica'));
            arrCola.listCola = r.videos.slice(0, 5);//DEU BOM E NOIS
            let str = "";
            i = 1;
            arrCola.listCola.map(item => {
                str += `/p ${i} - ${item.title}\n`;
                i++;
            });
            await interaction.editReply(str);
        })();
    }
, arrCola};//VO CRIA O METODO PAUSE E UNPAUSE