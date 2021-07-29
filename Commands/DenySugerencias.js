const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'DenySugerencias',
    description: 'Denegar una sugerencia',
    async execute(client,message,args,discord){
        if(!message.member.roles.cache.has(`ROL ID`)) return; //rol admin

        const messageID = args[0];
        const denyQuery = args.slice(1).join(" ");
        
        if(!messageID) return message.reply("porfavor especifica la id del mensaje")
        if(!denyQuery) return message.reply("porfavor especifica la razon del rechazo")

        try{
            const suggestionChannel = message.guild.channels.cache.get(`CHANNEL ID`) //canal sugerencias
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID);
            const data = suggestedEmbed.embeds[0];
            const deniedEmbed = new MessageEmbed()
            .setAuthor("Anonimo",`https://www.seekpng.com/png/detail/960-9609689_red-question-mark-symbol-question-mark.png`)
            .setTitle("Sugerencia : Denegada")
            .setDescription(data.description)
            .setColor("#b81f31")
            .addField("Razon de Denegacion : ", denyQuery)
            .setFooter("para hacer sugerencias usa m!sugerencia")

        suggestedEmbed.edit(deniedEmbed)   
        } catch(err){
            message.channel.send('no se pudo encontrar una sugerencia con esa ID')
        }
    }
}
