import * as Discord from 'discord.js';
import auth from '../auth.json';
import { CommandBus } from './commands/Command.bus';

var bot = new Discord.Client();

bot.on("ready", () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(`${bot.user.username} - (${bot.user.id})`);
});

bot.on('message', (oMessage) => {
    let message = oMessage.content;
    if (message.substring(0, 1) == '!') {
        let args = message.substring(1).split(',');
        let cmdAndArg = args[0].split(' ');
        let cmd = cmdAndArg[0];

        args = args.splice(1);
        args.unshift(cmdAndArg.splice(1).join(" "));
        CommandBus.useCommand(cmd, args, oMessage);
    }
});

if (process.argv[2] === "dev") {
    try {
        bot.login(auth.tokendev);
    } catch (e) {
        console.error("Invalid develop authentication token");
        bot.login(auth.token);
    }
} else {
    bot.login(auth.token);
}
