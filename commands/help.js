const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let helpembed = new Discord.RichEmbed()
  .setDescription("Help Menu")
  .setColor("#8300ff")
  .addField("Member Commands", "Help, serverinfo, bot info, userinfo, and report.");

  message.channel.send(helpembed);

  if(message.member.hasPermission("MANAGE_MESSAGES")){
   let modembed = new Discord.RichEmbed()
  .setDescription("Moderator Help Menu")
  .setColor("#8300ff")
  .addField("Mod Commands", "addrole, removerole, kick, warn, warnlevel, ban");

  try{
    await message.author.send(modembed);
    message.react("🔥")
  }catch(e){
    message.reply("Your DMS are locked. I cannot send you the mod commands.");
  }

  }
}

module.exports.help = {
  name: "help"
}
