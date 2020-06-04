import * as Discord from 'discord.js';
import cluster from 'cluster';
import auth from '../auth.json';
import { CommandBus } from './commands/Command.bus';

var bot = new Discord.Client();

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    cluster.fork();
    // Whenever a worker has dropped, spin it back up
    cluster.on('exit', (worker: cluster.Worker, code: number, signal: string) => {
        // spin up worker
        console.log("Worker is being restarted...");
        cluster.fork();
    });
} else {
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

    bot.on('disconnect', (event) => {
        
    });
    
    bot.login(auth.token);

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
}