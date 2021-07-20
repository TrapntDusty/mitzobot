const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'sugerencias',
    description: 'Dar una Sugerencia',
    async execute(client,message,args,discord){
        //const suggestionChannel = message.guild.channels.cache.get(`824450189095731200`)
        const suggestionQuery = args.join(" ")

        if(!suggestionQuery){
            message.delete()
            message.reply('porfavor especifica la sugerencia')
            .then(msg => {
                setTimeout(() => message.delete(), 10000)
              })
              .catch
            return;
        }
        const embed = new MessageEmbed()
        .setAuthor("Anonimo",`https://www.seekpng.com/png/detail/960-9609689_red-question-mark-symbol-question-mark.png`)
        .setTitle("Sugerencia")
        .setDescription(`${suggestionQuery}`)
        .setColor("#178FB7")
        .setFooter("para hacer sugerencias usa m!sugerencia")

        //let embed1 = await message.channel.send(embed)
        message.delete()

        client.channels.cache.get(`828095608316362804`).send(embed).then(embedMessage => { //canal sugerencia manda embed
            embedMessage.react('⬆️');
            embedMessage.react('⬇️');
        });
        /*const favor = '⬆️';
        const contra = '⬇️';
        message.react('⬆️');
        message.react('⬇️');*/
        
    }
}