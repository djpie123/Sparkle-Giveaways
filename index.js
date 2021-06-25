const Discord = require('discord.js');
// require Nuggies package
const client = new Discord.Client();
const fs = require('fs');

// Connect to the database
const { GiveawayCreator } = require('discord-giveaway');
const Creator = new GiveawayCreator(client, 'mongodb url');

client.giveaways = Creator;

// login to the bot
client.login("token");

client.on('ready', () => {
    console.log(`${client.user.tag} is online.`)
client.user.setActivity(`Giveaways in ${this.client.guilds.cache.size} servers || type s!invite to invite`, {
        type: "WATCHING"  
      });

});

// handle giveaway buttons

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    const file = files.filter(f => f.split('.').pop() === 'js');
    if (file.length < 1) {
        console.log('No Commands.');
        return;
    }
    file.forEach(f => {
        const pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(aliases => client.aliases.set(aliases, pull.config.name));
    });
});
this.client = client;
client.on('message', async message => {
const tags = [`<@${this.client.user.id}>`, `<@!${this.client.user.id}>`]
 if(message.content.startsWith(tags)){
const sh = new Discord.MessageEmbed()
.setTitle("Short help command")
.setDescription(`Hi, I'm sparkle giveaways bot! My prefix is "s!".\n Use s!help to get the commands list.`)
message.channel.send(sh)
}
});
client.on('message', async message => {
    const prefix = 's!'
    if (message.author.bot || message.channel.type === 'dm') return;
    if (message.content.startsWith(prefix)) {
        const messageArray = message.content.split(' ');
        const cmd = messageArray[0]
        const args = messageArray.slice(1);
        const command = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
        if (command) {
            if (!command.config.botPerms) return console.log("You didn't provide botPerms");
            if (!Array.isArray(command.config.botPerms)) return console.log('botPerms must be an array.');
            if (!command.config.userPerms) return console.log("You didn't provide userPerms.");
            if (!Array.isArray(command.config.userPerms)) return console.log('userPerms must be an array.')
            if (!message.guild.me.hasPermission(command.config.botPerms)) {
                const beauty = command.config.botPerms.join('\`, \`');
                const noBotPerms = new Discord.MessageEmbed()
                    .setTitle('Missing Permissions')
                    .setDescription(`I am missing these permissions: \`${beauty}\`.`)
                    .setColor('RED');
                return message.channel.send(noBotPerms)
            }
            if (!message.member.hasPermission(command.config.userPerms)) {
                const beauty = command.config.userPerms.join('\`, \`');
                const noUserPerms = new Discord.MessageEmbed()
                    .setTitle('Missing Permissions')
                    .setDescription(`You are missing these permissions: \`${beauty}\`.`)
                    .setColor('RED');
                return message.channel.send(noUserPerms)
            }

            command.run(client, message, args);
        }
    }
});
client.api.applications("798061803476877322").commands.post({data: {
      name: "help",
            description: "get some help"
        }
    });
client.api.applications("798061803476877322").commands.post({data: {
      name: "invite",
            description: "invite me"
        }
    });
client.api.applications("798061803476877322").commands.post({data: {
      name: "start",
            description: "start a giveaway",
options: [
                {
                    name: "time",
                    description: "time of the giveaway",
                    type: 3,
                    required: true,
                },
                   {
                    name: "winner",
                    description: "number of winners",
                    type: 4,
                    required: true,
                 },
                 {
                    name: "prize",
                    description: "prize of giveaway",
                    type: 3,
                    required: true,
                }
          ]
    }
});
client.api.applications("798061803476877322").commands.post({data: {
      name: "end",
            description: "end a giveaway",
options: [
                {
                    name: "giveawayid",
                    description: "Id of the giveaway message",
                    type: 3,
                    required: true,
                }
          ]
    }
});
client.api.applications("798061803476877322").commands.post({data: {
      name: "reroll",
            description: "reroll a giveaway",
options: [
                {
                    name: "giveawayid",
                    description: "Id of the giveaway message",
                    type: 3,
                    required: true,
                }
          ]
    }
});
client.ws.on('INTERACTION_CREATE', async interaction => {
        const slcmd = interaction.data.name.toLowerCase();
         const args = interaction.data.options;
    if(slcmd == "help"){ 
  const help = new Discord.MessageEmbed()
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
   client.api.interactions(interaction.id, interaction.token).callback.post({data: {
data: {
					embeds: [help],
				},
				type: 4
}})          

    }else if(slcmd == "invite"){
    const invite = new Discord.MessageEmbed()  //Ver 11.5.1 of 
.setTitle("invite")
.setColor('#993399')
.setFooter("SPARKLE GIVEAWAYS || MADE BY PIE IS LIVE ❤️")
.setURL("https://discord.com/api/oauth2/authorize?client_id=798061803476877322&permissions=404544&scope=bot%20applications.commands")
.setThumbnail('https://c.tenor.com/Td_NKqVNOqsAAAAM/ijhk.gif')
.setTimestamp()
client.api.interactions(interaction.id, interaction.token).callback.post({data: {
data: {
					embeds: [invite],
				},
				type: 4
}})
}else if(slcmd == "start"){
client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Started the giveaway Below :-"
                    }
                }
            });
const ms = require("ms");
 const time = args.find(arg => arg.name.toLowerCase() == "time").value;
 const winner = args.find(arg => arg.name.toLowerCase() == "winner").value;
const prize = args.find(arg => arg.name.toLowerCase() == "prize").value;
try{
await client.giveaways.startGiveaway({
            prize: prize,
            channelId: interaction.channel_id,
            guildId: interaction.guild_id,
            duration: ms(time),
            winners: winner,
            hostedBy: interaction.member.user.id,
        })
}catch(e){
console.log(e)
}
}else if(slcmd == "end"){
const id = args.find(arg => arg.name.toLowerCase() == "giveawayid").value;
 const ended = await client.giveaways.endGiveaway(!id);
if (!ended) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "This giveaway is already ended"
                    }
                }
            });
        }else {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Ended the giveaway"
                    }
                }
            });
        }
}else if(slcmd == "reroll"){
const id = args.find(arg => arg.name.toLowerCase() == "giveawayid").value;
 const rerolled = await client.giveaways.rerollGiveaway(!id);
if (!rerolled) {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "unable to reroll"
                    }
                }
            });
        }else {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: "Rerolled the giveaway"
                    }
                }
            });
        }
}
})
