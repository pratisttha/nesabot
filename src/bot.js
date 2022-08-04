const config = require("./config.json")
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    GatewayIntentBits.channel
  ]
});

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`)
})

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  
  
  // This is where we'll put our code.
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // CLI Starts here
  if (command === 'ping') {
    message.channel.send("Bong!");
  }

  if (command === 'oxy') {
    message.reply('Zone');
  }

  if (command === 'hi') {
    const embed = new EmbedBuilder()
    .setColor('#3498DB')
    .setAuthor( {name: 'NESA', iconURL: "https://i.imgur.com/lm8s41J.png"})
    .setTitle("title")
    .setURL("https://nepalesports.org")
    .setDescription("sanchai chau?")
    .setImage("http://i.imgur.com/yVpymuV.png")
    .setThumbnail("http://i.imgur.com/p2qNFag.png")
    // .addField("This is a single field title, it can hold 256 characters", "This is a field value, it can hold 1024 characters.")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    .addFields(
      { name: "Inline fields", value: "They can have different fields with small headlines, and you can inline them.", inline: true },
      { name: "Masked links", value: "You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.", inline: true },
      { name: "Markdown", value: "You can put all the *usual* **__Markdown__** inside of them.", inline: true }
    )
    /*
     * Blank field, useful to create some space.
     */
    // .addField("\u200b", "\u200b")
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .setFooter({text: "Namaste from nesa", iconURL: "http://i.imgur.com/w1vhFSR.png"});
    /*
     * With Discord now allowing messages to contain up to 10 embeds, we need to put it in an array.
     */
    message.channel.send({ embeds: [embed] });
    /* message.channel.send({ embeds: [{
      color: 3447003,
      author: "NESA",
      title: "HELLO!",
      fields: {
        name: "NEPAL ESPORTS ASSOCIATION",
        value: "ok",
        inline: true
      },
      description: "How R you?",
      timestamp: new Date(),
    }]}); */
  }
});
  
client.login(config.token);