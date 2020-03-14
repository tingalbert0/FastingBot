const Discord = require('discord.js');
const client = new Discord.Client();
const suncalc = require('suncalc');

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    var times = SunCalc.getTimes(new Date(), 33.7940, -84.3889);
    var sunset = times.sunset.getHours() + ':' + times.sunset.getMinutes();
    var isDinnerTime = new Date().getHours() == times.sunset.getHours() && new Date().getMinutes() == times.sunset.getMinutes();//exactly at sunset
    var nowHours = new Date().getHours();
    var nowMinutes = new Date().getMinutes();
    var now = nowHours + ':' + nowMinutes;
    var EatingTime = false;
    if (nowHours == times.sunset.getHours()) {
	if (nowMinutes <= times.sunset.getMinutes()) {
	    EatingTime = false;
	} else {
	    EatingTime = true;
	}
    } else if (nowHours > times.sunset.getHours()) {
	EatingTime = true;
    }
	
    if (nowHours == times.sunrise.getHours()) {
	if (nowMinutes <= times.sunrise.getHours()) {
	    EatingTime = true;
	} else {
	    EatingTime = false;
	}
    } else if (nowHours < times.sunrise.getHours()) {
	EatingTime = true;
    }
    
    if (message.content === 'can i eat now') {
       	if (EatingTime) {
	    message.reply('Yes <:hypers:650866330005798912>');
	} else {
	    message.reply('No <:PepeHands:685227664776101912>');
	}
    }
    if (message.content === 'ping') {
	    message.reply('pong');
    }
});

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
