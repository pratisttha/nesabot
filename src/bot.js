const config = require("./config.json")
const { Client, GatewayIntentBits, EmbedBuilder, GuildMember } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const client = new Client({
  intents: [ 
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    GatewayIntentBits.channel
  ]
}); 

//call event.js form events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`)

  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  }
  else {
    client.once(event.name, (...args) => event.execute(...args));
  }
}

//This listens to the message and replies to them.
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  
  
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // CLI Starts here
  if (command === 'ping') {
    message.channel.send("pong!");
  }

  if (command === 'oxy') {
    message.reply('Zone');
  }

  if (command === 'bye') {
    message.reply('Pie Pie! Hap A nice dream laa! Gutumutu nyts!');
  }

  if (command === 'hi') {
    const embed = new EmbedBuilder()
    .setColor('#3498DB')
    .setAuthor( {name: 'NESA', iconURL: "https://i.imgur.com/lm8s41J.png"})
    .setTitle("Hello! How r Khana Kha k jana ha!")
    .setURL("https://nepalesports.org")
    .setDescription("sanchai chau?")
    // .setImage("http://i.imgur.com/yVpymuV.png")
    .setThumbnail("http://i.imgur.com/p2qNFag.png")
    // .addFields(
    //   { name: "Inline fields", value: "They can have different fields with small headlines, and you can inline them.", inline: true },
    //   { name: "Masked links", value: "You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.", inline: true },
    //   { name: "Markdown", value: "You can put all the *usual* **__Markdown__** inside of them.", inline: true }
    // )
    .setTimestamp()
    .setFooter({text: "Namaste from nesa", iconURL: "http://i.imgur.com/w1vhFSR.png"});
    
    message.channel.send({ embeds: [embed] });
    
  }
});

client.on("guildMemberAdd", function(member){{
  console.log(`"${member.user.username}" has joined the server "${member.guild.name}"`)
    const welcomeEmbed = new EmbedBuilder()
    .setColor('#3498DB')
    .setTitle( `Welcome!` )
    .setDescription(`${member.user} has joined the server! We hope you enjoy your stay!`)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp()
  member.guild.channels.cache.find(c => c.name === "welcome").send({embeds: [welcomeEmbed]});
  
}});
//${member.user.username}




  
client.login(config.token);