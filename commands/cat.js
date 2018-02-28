const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

let {body} = await superagent
.get(`http://random.cat/meow`);

let catembed = new Discord.RichEmbed()
.setColor("#ff9900")
.setTitle("cat :cat:")
.setImage(body.file);

message.channel.send(catembed);

}

module.exports.help = {
    name: "cat"
}