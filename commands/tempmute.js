const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  if(!message.member.hasPermission("MANAGE_MESAGES")) return message.reply("No can do.");
  if(args[0] == "help"){
    message.reply("Usage: !tempmute <user> <time: 1s/m/h/d>");
    return;
  }
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Impossible de les mettre en sourdine!");
  
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Merci d'indiquer une raison")
  console.log(reason)
  
  let muterole = message.guild.roles.find(`name`, "⛔ Mute");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "⛔ Mute",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
