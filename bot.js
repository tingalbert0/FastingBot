const Discord = require('discord.js');
const client = new Discord.Client();
var BOT_TOKEN = "yCBOIFXbspJWm3okBg9lKU7dfmUxl_rS";

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
       message.reply('pong');
       }
});

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
