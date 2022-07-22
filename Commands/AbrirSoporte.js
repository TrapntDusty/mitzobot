const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'AbrirSoporte',
    description: 'Aprobar una sugerencia',
    async execute(client,message,args,discord){
        if (!message.content.startsWith(prefix)) return;
            const category = message.guild.channels.cache.find((x) => x.name == "MITZO-MAIL")

            if (!category) {
                return message.channel.send("MitzoMail no se ha configurado para este server, usa " + prefix + "setup")
            }

            if (isNaN(args[0]) || !args.length) {
                return message.channel.send("Porfavor usa el ID de la persona")
            }

            const target = message.guild.members.cache.find((x) => x.id === args[0])

            if (!target) {
                return message.channel.send("No se encontro la persona con el ID.")
            }


            const channel = await message.guild.channels.create(target.id, {
                type: "text",
                parent: category.id,
                topic: "la asistencia es usada por todo mod y admin para ofrecer la mejor ayuda posible donde quiera que este"
            })

            let nembed = new discord.MessageEmbed()
                .setAuthor("detalles", target.user.displayAvatarURL({ dynamic: true }))
                .setColor("BLUE")
                .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("nombre", target.user.username)
                .addField("Contacto Directo", "Si (significa que Mods y Admins checan los mensajes)");

            channel.send(nembed)

            let uembed = new discord.MessageEmbed()
                .setAuthor("Contacto Directo abierto")
                .setColor("GREEN")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("Has sido contactado por un staff de **" + message.guild.name + "**, Porfavor espera");


            target.send(uembed);

            let newEmbed = new discord.MessageEmbed()
                .setDescription("Abrio la asistencia: <#" + channel + ">")
                .setColor("GREEN");

            return message.channel.send(newEmbed);
    }
}