const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can not perform this action");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user.");
  let role = args.slice(-1).join(" ");
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find((r) => r.name === role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congratulations, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congratulations to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }



}

module.exports.help = {

    name: "giverole"

}