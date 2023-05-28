import { Bot } from './src'
import { Command } from './src/commands/commandBuilder'

let bot = new Bot({
	token: 'ODYyNzQ1MDAwNjQzNTI2NjY2.GKBRaV.Rn8kwk1aGI-29RjiUpr1gFpH4Vq_ITmeAsnV8w',
	CLIENT_ID: '862745000643526666',
	GUILD_ID: '517631305299525638',
})
bot.addCommand(new Command('path', (i) => i.reply('Haha')))
bot.registerCommands()
bot.login()
