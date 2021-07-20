const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'ApproveSugerencias',
    description: 'Aprobar una sugerencia',
    async execute(client,message,args,discord){
        if(!message.member.roles.cache.has(`824186297513541652`)) return; // rol admin

        const messageID = args[0];
        const acceptQuery = args.slice(1).join(" ");
        
        if(!messageID) return message.reply("porfavor especifica la id del mensaje")
        if(!acceptQuery) return message.reply("porfavor especifica la razon de la aceptacion")

        try{
            const suggestionChannel = message.guild.channels.cache.get(`828095608316362804`) //canal sugerencias
            const suggestedEmbed = await suggestionChannel.messages.fetch(messageID); 
            const data = suggestedEmbed.embeds[0];
            const acceptedEmbed = new MessageEmbed()
            .setAuthor("Anonimo",`https://www.seekpng.com/png/detail/960-9609689_red-question-mark-symbol-question-mark.png`)
            .setTitle("Sugerencia : Aprobada")
            .setDescription(data.description)
            .setColor("#30c24b")
            .addField("Razon de aprovacion : ", acceptQuery)
            .setFooter("para hacer sugerencias usa m!sugerencia")

        suggestedEmbed.edit(acceptedEmbed)   
        } catch(err){
            message.channel.send('no se pudo encontrar una sugerencia con esa ID')
        }
    }
}