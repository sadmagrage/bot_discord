const { Client, GatewayIntentBits, Collection } = require("discord.js");
const path = require('path');
const fs = require('fs');
require("dotenv").config();
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
]});

module.exports = client;

//NOSSA EU VO CHORA, O BGL Q EU MANDAVA AS MSG E N APARECIA NO EVENT.MESSAGECREATE, REALMENTE, EU N TINHA PERMISSAO, TINHA Q MEXE NO DEVELOPER DS E NO GATEWAYINTENTBITS, 1 DIA INTEIRO P DESCOBRI ISSO

//LOAD EVENTS

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

eventFiles.map(file => {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

//LOAD COMMANDS

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.map(file => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
})

//DEPOIS EU TENHO Q PASSA ESSAS FUNCOES, DESCE Q EU CONSIGA DA UM JEITO DE PASSAR O VOICESTATEDATA


client.login(process.env.TOKEN);