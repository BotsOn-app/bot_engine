import { Client } from 'discord.js'

export class Bot {
	public client: Client
	constructor() {
		this.client = new Client({
			intents: [],
		})
	}

	public login(token: string) {
		this.client.login(token)
	}
}
