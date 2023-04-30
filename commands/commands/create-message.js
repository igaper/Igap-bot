const { SlashCommandBuilder, PermissionFlagsBits, Client, TextChannel } = require("discord.js");

module.exports = {    
    data: new SlashCommandBuilder()
        .setName('create-message')
        .setDescription('Creates initial message for recruitment needs.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.reply({ content: `Sending the message to this channel.`, ephemeral: true}),

		interaction.channel.send(
        'It is still work in progress\n'+
        '<:SonsOfHorus:1069003358737793174> Pants of Horus 29/29\n'+
        '<:AlphaLegion:1069003322570309752> Alpha Legion 28/29 :warning: \n'+
        '<:ultramarines:1069003367843643502> Ultramarines 28/29 :warning: \n'+
        '<:ThousandSons:1069003364370743416> Thousand Sons 28/29 :warning: \n'+
        '<:IronWarriors:1069003345026621551> Iron Warriors 30/30\n'+
        '<:salamanders:1069003355512377487> Salamanders 27/29\n'+
        '<:BloodAngels:1069003325195948153> Blood Angels 28/29 :warning: \n'+
        '<:WordBearers:1069003376777515130> Word Bearers 28/29 \n'+
        '<:LunaWolves:1069003494129938472> Luna Wolves 30/30\n'+
        '<:SpaceWolves:1069003362172940309> Space Wolves 28/29\n'+
        '<:WhiteScars:1069003372851634226> White Scars 30/30\n'+
        '<:RavenGuard:1069003352433762304> Raven Guard 30/30\n'+
        '<:ImperialFists:1069003337275560037> Imperial Fists 27/28 :warning: \n'+
        '<:NightLords:1069003350462443631> Night Lords 28/28\n'+
        '<:WorldEaters:1069003378794958900> World Eaters 30/30\n'+
        '<:DarkAngels:1069003328358457344> Dark Angels 26/28\n'+
        '<:EmperorsChildren:1069003335241310248> Emperor\'s Children 30/30\n'+
        '<:DeathGuard:1069003332028473384> Death Guard 30/30\n'+
        '<:IronHands:1069003342975619122> Iron Hands 30/30\n'
        );
    }
};

