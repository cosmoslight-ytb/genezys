const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});

bot.commands = new Discord.Collection();

var Attente = [];


bot.on('message', (msg) => {

  if(msg.channel.name == "certification"){

  if(msg.author !== bot.user) {

    msg.delete();

  }else{

    msg.channel.send();

  }
}

});


bot.on('message', (msg) => {

if(msg.author.id != bot.id){

if(msg.channel.name == "certification" && msg.content.startsWith(prefix)){

        var say = msg.content.substr(1);

        for(i=0;i<Attente.length;i++){

            var code = Attente[i].indexOf("x");

        }

        code++;

        for(i=0;i<Attente.length;i++){

var recode = Attente[i].substr(code);

}
		if(say == recode){

            Attente.pop();     

let NouveauMembre = msg.guild.roles.find("name", "Membres");

if(!msg.guild.roles.exists("name", "Membres")) {

        return  msg.channel.send("**:x: Le role `Membres` n'existe pas, veuillez le créer pour faire fonctionner le captcha!**")
     
      } 
msg.member.addRole(NouveauMembre).catch(err => console.log(err));   

        }else{

            msg.author.send("**:x: Vous avez pas réussi à passer le captcha...**");

            msg.delete();

            if(!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) {

  return;
}

msg.guild.member(msg.author).kick();

		}
  }
}

});

bot.on('guildMemberAdd', member => {  

const salon = member.guild.channels.find('name', 'bienvenue');

    if(!salon) return;

var captcha = String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4);
           
            member.send("**Bienvenue @"+ member.user.username + "** copie/colle le code ci-join dans **#certification** pour passer le captcha du serveur\n```." + captcha + "```");
        
            member.user.id;
         
            Attente.push(member.user.id + "x" + captcha);

    salon.send("**Bienvenue @"+ member.user.username + "**"); 

});

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("", {type: "STREAMING"});

});

bot.on("message", async message => {
  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLocaleLowerCase()){
    case "help":
      var help_embed =new Discord.RichEmbed()
        .setTitle("Les commandes du bot")
        .setDescription("Voici toutes les commandes disponnible du bot")
        .setThumbnail("https://cdn.discordapp.com/avatars/385823525388419073/7d98c5e8b3c89b6852346e9e6eaba1cb.jpg?size=128")
        .addField("intercation", "Aucunnes commandes dispo")
        .setThumbnail(bot.user.avatarURL)
      message.author.send({embed: help_embed});
  }

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(process.env.TOKEN);
