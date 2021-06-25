module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply('Please provide a message ID to the giveaway!', { allowedMentions: { repliedUser: false } });
        const rerolled = await client.giveaways.rerollGiveaway(args[0]);
        
        if (!rerolled) {
            return message.channel.send('This giveaway hasn\'t ended');
        }
        else {
            message.channel.send('Rerolled the giveaway');
        }

}

module.exports.config = {
    name: 'reroll',
    description: 'Reroll a giveaway',
    usage: '?reroll <messageID>',
    botPerms: [],
    userPerms: [''],
    aliases: []
}