const { MessageEmbed } = require("discord.js");
const mineflayer = require('mineflayer')

module.exports = {
    name: 'Minecraft',
    description: 'Bot Server Side Startup',
    async execute(client,message,args,discord){
        const bot = mineflayer.createBot({
            host: "163.123.206.34", //host
            port: 25500, //port 
            username: "MitzoBot"
          })
        
        function createBot(){
            const bot = mineflayer.createBot({
                host: "163.123.206.34", //host
                port: 25500, //port 
                username: "MitzoBot"
              })
        
            bot.once('spawn', () => {
                bot.chat('/login MitzoBot123')
            })
        }
        
            bot.once('spawn', () => {
                bot.chat('/login MitzoBot123')
            })
    }
}