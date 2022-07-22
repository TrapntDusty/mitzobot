const { MessageEmbed } = require("discord.js");
const mineflayer = require('mineflayer')

module.exports = {
    name: 'MantenimientoOff',
    description: 'Mantenimiento Apagar',
    async execute(client,message,args,discord){
        if (!message.content.startsWith(prefix)) return; //prefjo
        if(!message.member.roles.cache.has(`824186297513541652`)) return; //rol admin
        client.channels.cache.get("825941198417035274").setName("🟢IP: uanl.minecraft.casa");  //cambiando el nombre al canal principal
        bot.chat("/whitelist off") // el bot desactiva la whitelist
        const ManteChannel = client.channels.cache.get("824201028160323584").send("<:MineUanl:824196564862894080>  **SERVIDOR EN LINEA** <:MineUanl:824196564862894080> ✅") //Aqui el bot mandara el mensaje de mantenimiento activado
        const Channel = client.channels.cache.get("867134933017690164")
        let RoleMante = message.guild.roles.cache.get("824188004054073345");
        Channel.updateOverwrite(RoleMante, {VIEW_CHANNEL: true});
    }
}