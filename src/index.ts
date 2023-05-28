import {
	Client,
	CommandInteraction,
	IntentsBitField,
	REST,
	Routes,
	SlashCommandBuilder,
} from 'discord.js'
import { Command, CommandBuilder } from './commands/commandBuilder'

type BotSpecs = { token: string; CLIENT_ID: string; GUILD_ID: string }

export class Bot {
	public client: Client
	private specs: BotSpecs

	private commands: {
		data: SlashCommandBuilder
		execute(interaction: CommandInteraction): Promise<void>
	}[] = []

	constructor(botSpecs: BotSpecs) {
		this.specs = botSpecs
		this.client = new Client({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.MessageContent,
			],
		})
	}

	public login() {
		this.client.login(this.specs.token)
	}

	public addCommand(command: Command) {
		this.commands.push(command.convert())
	}

	public async registerCommands() {
		let rest = new REST({ version: '10' }).setToken(this.specs.token)
		await rest.put(
			Routes.applicationGuildCommands(
				this.specs.CLIENT_ID,
				this.specs.GUILD_ID
			),
			{
				body: this.commands,
			}
		)
	}
}
