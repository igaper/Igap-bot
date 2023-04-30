const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, IntentsBitField, Message} = require('discord.js');
require('dotenv').config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
})

client.on('messageCreate', (msg) => {
    if (msg.content === 'Fuck you') {
        msg.reply('Fuck you too');
    }
})

client.on('messageCreate', (msg) => {
    if (msg.content === 'Fuck you Hollow') {
        msg.reply('Yeah fuck Hollow!');
    }
})

client.on('messageCreate', async (msg) => {
    if (msg.content === 'Test') {
        const str = await client.guilds.cache.get('664611713311571983').channels.cache.get('1100849549372825621').messages.fetch('1100886527443222548')
            .then(message => message.content)
            .catch(console.error);
			console.log(str);
    }
})

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
	
    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});



client.login(process.env.DISCORD_TOKEN)