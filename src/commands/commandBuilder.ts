import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export class CommandBuilder extends SlashCommandBuilder {}

export class Command {
	private event: (interaction: CommandInteraction) => void
	public name: string
	constructor(
		name: string,
		event: (interaction: CommandInteraction) => void
	) {
		this.event = event
		this.name = name
	}

	public convert() {
		let event = this.event
		return {
			data: new SlashCommandBuilder().setName(this.name),
			async execute(interaction: CommandInteraction) {
				event(interaction)
			},
		}
	}
}
