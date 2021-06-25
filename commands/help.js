const {MessageEmbed} = require('discord.js')
const help = new MessageEmbed()
   .setTitle(`HELP`)
   .setURL("https://discord.gg/HfkfcMS")
   .setAuthor("Total Commands")
   .setThumbnail("https://cdn.discordapp.com/avatars/758586410177134603/61399c7e3a64a4ee3e7570e85b1f0d8e.png?size=128")
   .addField('start', "to start giveaways \n usage: s!start 1d 1w example", false)
   .addField('create', "to create a giveaway easily", false)
   .addField('reroll', "to reroll giveaways", false)
   .addField('end', "to end giveaways", false)
   .addField('invite', "to invite giveaways", false)
   .addField('prefix', "s!", false)
   .setColor('#993399')
   .setFooter("SPARKLE GIVEAWAYS || MADE BY PIE IS LIVE ❤️")
   .setTimestamp()
module.exports.run = async (client, message, args) => {
  message.channel.send(help)
}
module.exports.config = {
    name: 'help',
    description: 'get some help',
    usage: '',
    botPerms: [],
    userPerms: [''],
    aliases: []
}