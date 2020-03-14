
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var SunCalc = require('suncalc');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (channelID, message, evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
	//
	var times = SunCalc.getTimes(new Date(), 33.7940, -84.3889);
	var nowHours = new Date().getHours();
	var nowMinutes = new Date().getMinutes();
	var isDinnerTime = nowHours == times.sunset.getHours() && nowMinutes == times.sunset.getMinutes();//exactly at sunset
	var is10DinnerTime = nowHours == times.sunset.getHours() && nowMinutes == times.sunset.getMinutes() - 10;
	var isBreakfast = nowHours == times.sunrise.getHours() && nowMinutes == times.sunrise.getMinutes();
	var EatingTime = (new Date().getHours() >= times.sunset.getHours() && new Date().getMinutes() >= times.sunset.getMinutes())
						|| (new Date().getHours() <= times.sunrise.getHours() && new Date().getMinutes() <= times.sunrise.getHours());
	
	if (isDinnerTime) {
		bot.sendMessage({to: channelID, message: 'DINNERTIME\n<:POGGERS:650866528803225620><:POGGERS:650866528803225620><:POGGERS:650866528803225620>'});
	}
	if (isBreakfast) {
		bot.sendMessage({to: channelID, message: 'Stop Eating Now\n<:FeelsBadMan:650866527951912960>'});
	}
	if (is10DinnerTime) {
		bot.sendMessage({to: channelID, message: 'You can eat in 10 minutes. Prepare ur forks<:POGGERS:650866528803225620>'});
	}
});


bot.on('message', function (user, userID, channelID, message, evt) {
	//bot.sendMessage({to: channelID, message: 'tfw I\'m working on this instead of my actual java project <:OMEGALUL:650866400914833419>'});
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
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

	if (message == 'can i eat now') {
		if (EatingTime) {
			bot.sendMessage({to: channelID, message: 'Yes <:hypers:650866330005798912>'});
		} else {
			bot.sendMessage({to: channelID, message: 'No <:PepeHands:685227664776101912>'});
		}
	}
	if (message == 'is this working') {
		bot.sendMessage({to: channelID, message: 'perhaps'});
	}
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: '<:POGGERS:650866528803225620>'
                });
			break;
            // Just add any case commands if you want to..
         }
     }
	 //bot.sendMessage({to: channelID, message: 'this is working'});
});