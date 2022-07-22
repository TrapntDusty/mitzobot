const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'CerrarSoporte',
    description: 'Aprobar una sugerencia',
    async execute(client,message,args,discord){
        if (!message.content.startsWith(prefix)) return;
            if (message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "MITZO-MAIL").id) {

                const person = message.guild.members.cache.get(message.channel.name)

                if (!person){
                }

                await message.channel.delete()

                let yembed = new discord.MessageEmbed()
                    .setAuthor("Asistencia Cerrada", client.user.displayAvatarURL())
                    .setColor("RED")
                    .setFooter("Asistencia Cerrada por " + message.author.username)
                if (args[0]) yembed.setDescription(`Razón: ${args.join(" ")}`)

                return person.send(yembed)

            }
    }
}