const giveaway = {};
const ms = require('ms');
module.exports.run = async (client, message, args) => {
const filter = m => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter, { max: 6, time: 60 * 1000 });
    let step = 0;

    message.channel.send('What is the prize?');
    collector.on('collect', async (msg) => {
        if (!msg.content) return collector.stop('error');

        step++;
        if (step == 1) {
            const prize = msg.content;
            message.channel.send(`The prize is **${prize}**! Which channel do you want to host in?`, { allowedMentions: { roles: [], users: [], parse: [] } });
            giveaway.prize = prize;
        }
        else if (step == 2) {
            const channel = msg.mentions.channels.first() || msg.guild.channels.cache.get(msg.content);
            if (!channel) return collector.stop('error');
            giveaway.channel = channel.id;
            message.channel.send(`Channel is <#${channel.id}>! Now how many winners do you want?`);
        }
        else if (step == 3) {
            const winners = msg.content;
            if (isNaN(winners)) return collector.stop('error');
            if (parseInt(winners) > 10) {
                message.reply('You cannot have more than 10 winners!');
                return collector.stop('error');
            }
            giveaway.winners = parseInt(winners);
            message.channel.send(`${winners} winner(s) will be chosen for this giveaway! How much time do you want?`);
        }
        else if (step == 4) {
            const time = msg.content;
            if (!ms(time)) return collector.stop('error');
            giveaway.time = time
            if (ms(giveaway.time) > ms('14d')) return collector.stop('HIGH_TIME');
            message.channel.send(`The time is now set to ${time}! Who is hosting the giveaway?`);
        }
        else if (step == 5) {
            const host = msg.mentions.users.first() || msg.guild.members.cache.get(msg.content) || message.member;

            giveaway.host = host.id;
            message.channel.send(`The host is ${host}! Now Is this correct?\n\`\`\`Prize: ${giveaway.prize}\nWinner(s): ${giveaway.winners}\nTime: ${ms(giveaway.time)}\nhost: ${message.guild.members.cache.get(giveaway.host).user.username}\n\`\`\`Reply with \`yes\` or \`no\`!`);
        }
        else if (step == 6) {
            if (!['yes', 'no'].includes(msg.content)) return collector.stop('error');
            if (msg.content == 'yes') return collector.stop('done');
            if (msg.content == 'no') return collector.stop('cancel');
        }
    })

    collector.on('end', async (msgs, reason) => {
        if (reason == 'time') return message.channel.send('You did not reply in time!');
        if (reason == 'error') return message.channel.send('You did not provide valid option!');
        if (reason == 'cancel') return message.channel.send('Cancelled giveaway setup due to wrong info!');
        if (reason == 'HIGH_TIME') return message.channel.send('The time cannot be more than 14 days!');

        if (reason == 'done') 
            await client.giveaways.startGiveaway({
                prize: giveaway.prize,
                hostedBy: giveaway.host,
                winners: giveaway.winners,
                duration: ms(giveaway.time),
                channelId: giveaway.channel,
                guildId: message.guild.id
            });
            await message.channel.send('Created a giveaway!').then(m => setTimeout(() => m.delete(), 2000));
    })
}
module.exports.config = {
    name: 'create',
    description: 'Create a giveaway',
    usage: '',
    botPerms: [],
    userPerms: [''],
    aliases: []
}
