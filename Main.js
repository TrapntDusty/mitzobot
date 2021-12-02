const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILD_PRESENCES", "GUILD_MEMBERS"] })
const fs = require('fs');
const prefix = "m!"
//const config = require('./config.json')
const ServerID = `819284631601414156`
client.commands = new discord.Collection();
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'))

//!   ------------------------------------------ SECCION DEL BOT --------------------------------------------------------------
const mineflayer = require('mineflayer')

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

  client.on('message', message => {
    // Only handle messages in specified channel
    if (message.channel.id != 867058152616230912) return
    // Ignore messages from the bot itself
    if (message.author.id == client.user.id) return
    bot.chat(`/msg ${message.content}`)
  })

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
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


//!   ------------------------------------- FIN DE LA SECCION DEL BOT ----------------------------------------------------

for(const file of commandFiles) {
    const command = require(`./Commands/${file}`)
    client.commands.set(command.name, command);
}


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

        if (command == "mod-mail") {
            if (!message.content.startsWith(prefix)) return;
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Ocupas Admin para Configurar!")
            }

            if (!message.guild.me.hasPermission("ADMINISTRATOR")) {
                return message.channel.send("Bot Ocupa Admin para operar!")
            }
            await message.guild.channels.create("MITZO-MAIL", {
                type: "category",
                topic: "Toda Asistencia aparecera aqui",
                permissionOverwrites: [
                    {
                        id: role.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                    }
                ]
            })


            return message.channel.send("Instalacion Completa ✅")
//! SUGERENCIAS                                           //////////////                                                  ///////////////////////
        } else if(command == "sugerencia"){ // aqui empieza las sugerencias 
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
            if (!message.content.startsWith(prefix)) return; //prefijo
            if(!message.member.roles.cache.has(`824186297513541652`)) return; //rol admin
            client.channels.cache.get("825941198417035274").setName("🟡IP: uanl.minecraft.casa");  //cambiando el nombre al canal principal
            bot.chat("/whitelist on") // el bot activa la whitelist 
            const ManteChannel = client.channels.cache.get("824201028160323584").send("<:MineUanl:824196564862894080>  **𝐒𝐄𝐑𝐕𝐈𝐃𝐎𝐑 𝐄𝐍 𝐌𝐀𝐍𝐓𝐄𝐍𝐈𝐌𝐈𝐄𝐍𝐓𝐎** <:MineUanl:824196564862894080>") //Aqui el bot mandara el mensaje de mantenimiento activado
            //! EL ID ES 824201028160323584
            const Channel = client.channels.cache.get("867134933017690164")
            let RoleMante = message.guild.roles.cache.get("824188004054073345");
            Channel.updateOverwrite(RoleMante, {VIEW_CHANNEL: false});

        }else if (command == "off"){
            if (!message.content.startsWith(prefix)) return; //prefjo
            if(!message.member.roles.cache.has(`824186297513541652`)) return; //rol admin
            client.channels.cache.get("825941198417035274").setName("🟢IP: uanl.minecraft.casa");  //cambiando el nombre al canal principal
            bot.chat("/whitelist off") // el bot desactiva la whitelist
            const ManteChannel = client.channels.cache.get("824201028160323584").send("<:MineUanl:824196564862894080>  **SERVIDOR EN LINEA** <:MineUanl:824196564862894080> ✅") //Aqui el bot mandara el mensaje de mantenimiento activado
            const Channel = client.channels.cache.get("867134933017690164")
            let RoleMante = message.guild.roles.cache.get("824188004054073345");
            Channel.updateOverwrite(RoleMante, {VIEW_CHANNEL: true});

        }else if(command == "mitzo"){
            if (!message.content.startsWith(prefix)) return; //prefjo
            sleep(30000).then(() => { createBot() })
// todo : FIN BOTON DE MANTENIMIENTO                                         /////////////////////////////////////
        }else if (command == "cerrar") {
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
        } else if (command == "abrir") {
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
        const guild = await client.guilds.cache.get(ServerID) || await client.guilds.fetch(ServerID).catch(m => { })
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

client.login("ODI3MzA2NTYxNDc5MTE0ODAz.YGZHRg.sUTeSuPKCCc7amiFoB1Bql9nI3Q")