const { Client, Collion, SlashCommandBuilder, IntentsBitField} = require("discord.js");
require('dotenv').config()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.login(process.env.DISCORD_TOKEN)

module.exports = {    
    data: new SlashCommandBuilder()
        .setName('set-member-count')
        .setDescription('Sets member count for specific guild.')
        .addStringOption(option =>
            option.setName('guild-name')
                .setDescription('Guild which member count you want to change')
                .setRequired(true)
                .addChoices(
                    { name: 'Pants of Horus', value: 'Pants of Horus' },
                    { name: 'Alpha Legion', value: 'Alpha Legion' },
                    { name: 'Ultramarines', value: 'Ultramarines' },
                    { name: 'Thousand Sons', value: 'Thousand Sons' },
                    { name: 'Iron Warriors', value: 'Iron Warriors' },
                    { name: 'Salamanders', value: 'Salamanders' },
                    { name: 'Blood Angels', value: 'Blood Angels' },
                    { name: 'Word Bearers', value: 'Word Bearers' },
                    { name: 'Luna Wolves', value: 'Luna Wolves' },
                    { name: 'Space Wolves', value: 'Space Wolves' },
                    { name: 'White Scars', value: 'White Scars' },
                    { name: 'Raven Guard', value: 'Raven Guard' },
                    { name: 'Imperial Fists', value: 'Imperial Fists' },
                    { name: 'Night Lords', value: 'Night Lords' },
                    { name: 'World Eaters', value: 'World Eaters' },
                    { name: 'Dark Angels', value: 'Dark Angels' },
                    { name: 'Emperor\'s Children', value: 'Emperor\'s Children' },
                    { name: 'Death Guard', value: 'Death Guard' },
                    { name: 'Iron Hands', value: 'Iron Hands' },
                ))
        .addIntegerOption(option =>
            option.setName('current-member-amount')
                  .setDescription('Current amount of members')
                  .setRequired(true)
                  .setMinValue(0)
                  .setMaxValue(30))
        .addIntegerOption(option =>
            option.setName('max-member-amount')
                .setDescription('Maximum amount of members')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(30))
        .addBooleanOption(option =>
            option.setName('projected-loss')
                .setDescription('Do you have projected loss?')),


    async execute(interaction) {
        const guildname = interaction.options.getString('guild-name');
		const maxMemberCount = interaction.options.getInteger('max-member-amount');
		const currentMemberCount = interaction.options.getInteger('current-member-amount');
		const projectedLoss = interaction.options.getBoolean('projected-loss');
        
        if(currentMemberCount > maxMemberCount) {
            await interaction.reply({ content: `Current member count is higher than max member count. Try again!`, ephemeral: true})
            return
        }

        if(interaction.channel.id !== '1100888448317005844') {
            interaction.reply({ content: `This is not guild-openings-chat channel`, ephemeral: true})
            return
        }
        
        await interaction.reply({ content: `Editing entry for ${guildname} to ${currentMemberCount}/${maxMemberCount}`, ephemeral: true})

        client.login(process.env.DISCORD_TOKEN)

        const str = await client.guilds.cache.get('664611713311571983').channels.cache.get('1100849549372825621').messages.fetch('1100927495752134696')
            .then(message => message.content)
            .catch(console.error);

        const split = await str.split(/\r?\n/);
        readyMessage = '';

        for (const element of split) {
            if (await element.includes(guildname)) {
                const elementSplit = await element.split(guildname);
                readyMessage = await readyMessage + elementSplit[0] + guildname + ` ${currentMemberCount}/${maxMemberCount}`
                if (projectedLoss) {
                    readyMessage = await readyMessage + ' :warning: '
                }
                readyMessage = await readyMessage + '\n'
            } else {
                readyMessage = await readyMessage + element + '\n';
            }
          }
        
        await client.guilds.cache.get('664611713311571983').channels.cache.get('1100849549372825621').messages.fetch('1100927495752134696')
            .then(message => message.edit(readyMessage));

        await interaction.editReply({ content: `Entry for ${guildname} has been edited to ${currentMemberCount}/${maxMemberCount}`, ephemeral: true})

    }
};