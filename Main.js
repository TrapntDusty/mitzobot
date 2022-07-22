const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILD_PRESENCES", "GUILD_MEMBERS"] })
const fs = require('fs');
const mineflayer = require('mineflayer')
const config = require('./config.json')
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const command = require(`./Commands/${file}`)
    client.commands.set(command.name, command);
}

//!   ------------------------------------------ SECCION DEL Minecraft BOT --------------------------------------------------------------

client.commands.get('minecraft').execute(client,message,args,discord)

  client.on('message', message => {
    // Only handle messages in specified channel
    if (message.channel.id != 867058152616230912) return
    // Ignore messages from the bot itself
    if (message.author.id == client.user.id) return
    bot.chat(`/msg ${message.content}`)
  })
  
  // Redirect in-game messages to Discord channel
  bot.on('whisper', (username, message,rawMessage) => {
    if (username == bot.username) return;
    if(username == "Console"){
        client.channels.cache.get('867058152616230912').send('<@&824186297513541652>')
        return;
    } 
    let lembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(username,`https://minotar.net/avatar/${username}`)
        .setDescription(message)
    return client.channels.cache.get('867058152616230912').send(lembed);
    //client.channels.cache.get('865076678522044446').send(`${username}: ${message}`);
  })


//!   ------------------------------------- FIN DE LA SECCION DEL Minecraft BOT ----------------------------------------------------


client.on("ready", () => {
    console.log("Bot online")
    client.user.setActivity("Mándame mensaje privado para contactar asistencia")
})


client.on("channelDelete", (channel) => {
    if (channel.parentID == channel.guild.channels.cache.find((x) => x.name == "MITZO-MAIL").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)
        if (!person) return;
        let yembed = new discord.MessageEmbed()
            .setAuthor("Asistencia Terminada", client.user.displayAvatarURL())
            .setColor('RED')
            .setDescription("la asistencia esta siendo borrada por un Mod/Admin")
        return person.send(yembed)
    }
})





client.on("message", async message => {
    //if (message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args.shift().toLowerCase();


    if (message.guild) {
//! SUGERENCIAS                                           //////////////                                                  ///////////////////////
        if(command == "sugerencia"){ // aqui empieza las sugerencias 
            if (!message.content.startsWith(prefix)) return;
            client.commands.get('sugerencias').execute(client,message,args,discord)
        } else if(command == "asugerencia"){ // aqui aprueba la sugerencia
            if (!message.content.startsWith(prefix)) return;
            client.commands.get('ApproveSugerencias').execute(client,message,args,discord)
        } else if(command == "dsugerencia"){ // aqui deniega la sugerencia
            if (!message.content.startsWith(prefix)) return;
            client.commands.get('DenySugerencias').execute(client,message,args,discord)
//!FIN DE SUGERENCIAS                                    //////////////                                                   ///////////////////////
// TODO: BOTON DE MANTENIMIENTO                                              /////////////////////////////////////
        }else if (command == "on"){
            client.commands.get('MantenimientoOn').execute(client,message,args,discord)
        }else if (command == "off"){
            client.commands.get('MantenimientoOff').execute(client,message,args,discord)
        }else if(command == "mitzo"){
            if (!message.content.startsWith(prefix)) return; //prefjo
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            sleep(30000).then(() => { client.commands.get('minecraft').execute(client,message,args,discord) })
// todo : FIN BOTON DE MANTENIMIENTO                                         /////////////////////////////////////
        }else if (command == "cerrar") {
            client.commands.get('CerrarSoporte').execute(client,message,args,discord)
        } else if (command == "abrir") {
            client.commands.get('AbrirSoporte').execute(client,message,args,discord)
        } else if (command == "help") {
            if (!message.content.startsWith(prefix)) return;
            let embed = new discord.MessageEmbed()
                .setAuthor('MITZO BOT') 
                .addField("m!sugerencia [texto]", "crear una sugerencia anonima", true)
                //.addField("m!setup", "configura el bot (no para multiple server.) [ solo mods y admins ]", true)
                //.addField("m!abrir", 'Te deja abrir mod mail para contactar con un us ID [ solo mods y admins ]', true)
                .setThumbnail(client.user.displayAvatarURL())
                //.addField("m!cerrar", "Commando para cerrar la asistencia.", true);

            return message.channel.send(embed)

        }
    } 

    if (message.channel.parentID) {
        const category = message.guild.channels.cache.find((x) => x.name == "MITZO-MAIL")
        if (message.channel.parentID == category.id) {
            let member = message.guild.members.cache.get(message.channel.name)
            if (!member){
            }
            let lembed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
            return member.send(lembed)
        }
    }

    if (!message.guild) {
        const guild = await client.guilds.cache.get(config.ServerID) || await client.guilds.fetch(config.ServerID).catch(m => { })
        if (!guild) return;
        const category = guild.channels.cache.find((x) => x.name == "MITZO-MAIL")
        if (!category) return;
        const main = guild.channels.cache.find((x) => x.name == message.author.id)
        if(main == '827306561479114803') return;
        if (!main) {
            let mx = await guild.channels.create(message.author.id, {
                type: "text",
                parent: category.id,
                topic: "Asistencia para :  **" + message.author.tag + " **"
            })
            let sembed = new discord.MessageEmbed()
                .setAuthor("Asistencia abierta")
                .setColor("GREEN")
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription("La conversacion a iniciado, seras contactado pronto")
            message.author.send(sembed)

            let eembed = new discord.MessageEmbed()
                .setAuthor("Detalles", message.author.displayAvatarURL({ dynamic: true }))
                .setColor("BLUE")
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(message.content)
                .addField("Nombre", message.author.username)
                .addField("Contacto Directo ", "No (lo abrio una persona no staff)")
                
            return mx.send(eembed)
        }

        let xembed = new discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(message.content)


        main.send(xembed)

    }

})

client.login("config.token")