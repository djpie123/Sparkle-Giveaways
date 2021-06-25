const {MessageEmbed} = require('discord.js')
const invite = new MessageEmbed()  //Ver 11.5.1 of 
.setTitle("invite")
.setColor('#993399')
.setFooter("SPARKLE GIVEAWAYS || MADE BY PIE IS LIVE ❤️")
.setURL("https://discord.com/api/oauth2/authorize?client_id=798061803476877322&permissions=404544&scope=bot%20applications.commands")
.setThumbnail('https://c.tenor.com/Td_NKqVNOqsAAAAM/ijhk.gif')
.setTimestamp()
module.exports.run = async (client, message, args) => {
  message.reply('check your dms <a:tada1:852794691987832832>')
  message.author.send(invite)
}
module.exports.config = {
    name: 'invite',
    description: 'invite this bot ',
    usage: '',
    botPerms: [],
    userPerms: [''],
    aliases: []
}