module.exports.run = async (client, message, args) => {
  if (!args[0]) return message.reply('Please provide a message ID of the giveaway to end!', { allowedMentions: { repliedUser: false } });
        const ended = await client.giveaways.endGiveaway(!args[0]);
        
        if (!ended) {
            return message.channel.send('This giveaway has already ended');
        }
        else {
            message.channel.send('Ended the giveaway');
        }
    }

module.exports.config = {
    name: 'end',
    description: 'End a giveaway',
    usage: '',
    botPerms: [],
    userPerms: [''],
    aliases: []
}