console.log("[INICIO] Actualizando estructura (OPTIMIZADA MULTI-SISTEMA)...");
const { Client, GatewayIntentBits, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config({ path: '.env.local' });

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const GUILD_ID = process.env.DISCORD_GUILD_ID;
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

// Definición de Roles con Permisos Granulares
const ROLES_CONFIG = [
    {
        name: 'Administrador',
        color: '#000000',
        permissions: [PermissionFlagsBits.Administrator]
    },
    {
        name: 'Bot Admin',
        color: '#2E2E2E',
        permissions: [PermissionFlagsBits.Administrator]
    },
    {
        name: 'Moderador',
        color: '#E91E63',
        permissions: [
            PermissionFlagsBits.KickMembers,
            PermissionFlagsBits.BanMembers,
            PermissionFlagsBits.ManageMessages,
            PermissionFlagsBits.MuteMembers,
            PermissionFlagsBits.DeafenMembers,
            PermissionFlagsBits.MoveMembers,
            PermissionFlagsBits.ManageThreads
        ]
    },
    {
        name: 'Dungeon Master',
        color: '#DC2626',
        permissions: [
            PermissionFlagsBits.ManageChannels,
            PermissionFlagsBits.ManageMessages,
            PermissionFlagsBits.PrioritySpeaker,
            PermissionFlagsBits.MoveMembers
        ]
    },
    {
        name: 'Beta Tester',
        color: '#9C27B0',
        permissions: [PermissionFlagsBits.ViewChannel]
    },
    {
        name: 'Ilustrador',
        color: '#FF9800',
        permissions: [
            PermissionFlagsBits.AttachFiles,
            PermissionFlagsBits.EmbedLinks,
            PermissionFlagsBits.UseExternalEmojis
        ]
    },
    {
        name: 'Traductor',
        color: '#00BCD4',
        permissions: [PermissionFlagsBits.CreatePublicThreads]
    },
    {
        name: 'Jugador',
        color: '#3B82F6',
        permissions: [PermissionFlagsBits.ChangeNickname]
    },
    { name: 'D&D 3.5', color: '#D4AF37' },
    { name: 'D&D 5e', color: '#EF4444' },
    { name: 'Pathfinder', color: '#10B981' },
    { name: 'Starfinder', color: '#6366F1' }
];

// Estructura Optimizada
const OPTIMIZED_STRUCTURE = [
    {
        name: '📜 RECEPCIÓN',
        channels: [
            { name: 'reglas', type: ChannelType.GuildText, topic: 'Normas de la comunidad y bienvenida.' },
            { name: 'roles-auto', type: ChannelType.GuildText, topic: 'Reacciona para obtener tus roles de sistema (3.5, 5e, PF).' },
            { name: 'anuncios', type: ChannelType.GuildText, topic: 'Noticias oficiales del Compendio.' }
        ]
    },
    {
        name: '🏰 LA TABERNA (SOCIAL)',
        channels: [
            { name: 'general', type: ChannelType.GuildText, topic: 'Charla libre sobre cualquier tema.' },
            { name: 'presentaciones', type: ChannelType.GuildText, topic: '¡Cuéntanos tu historia!' },
            { name: 'arte-y-mapas', type: ChannelType.GuildText, topic: 'Comparte tus dibujos, minis y mapas.' },
            { name: 'off-topic', type: ChannelType.GuildText, topic: 'Memes, videojuegos y vida real.' },
            { name: 'comandos-bot', type: ChannelType.GuildText, topic: 'Spam de dados y música aquí, por favor.' }
        ]
    },
    {
        name: '🔍 BÚSQUEDA DE GRUPO (LFG)',
        channels: [
            { name: 'tablon-de-misiones', type: ChannelType.GuildText, topic: 'Anuncios de partidas para cualquier sistema.' },
            { name: 'jugadores-libres', type: ChannelType.GuildText, topic: 'Jugadores buscando mesa.' }
        ]
    },
    {
        name: '🎲 D&D 3.5 & LEGACY',
        channels: [
            { name: 'dnd-35-general', type: ChannelType.GuildText, topic: 'Charla general de la edición 3.5.' },
            { name: 'reglas-y-dudas', type: ChannelType.GuildText, topic: '¿Cómo funciona Presa? Pregunta aquí.' },
            { name: 'builds-minmax', type: ChannelType.GuildText, topic: 'Optimización de personajes lvl 20.' }
        ]
    },
    {
        name: '🐉 D&D 5E & MODERN',
        channels: [
            { name: 'dnd-5e-general', type: ChannelType.GuildText, topic: 'Discusión sobre 5ª Edición y One D&D.' },
            { name: 'reglas-5e', type: ChannelType.GuildText, topic: 'Dudas sobre reglas de 5e.' }
        ]
    },
    {
        name: '🗺️ PATHFINDER & OTROS',
        channels: [
            { name: 'pathfinder-general', type: ChannelType.GuildText, topic: 'PF1e, PF2e y Starfinder.' },
            { name: 'otros-rpg', type: ChannelType.GuildText, topic: 'Vampiro, Cthulhu y más.' }
        ]
    },
    {
        name: '📚 COMPENDIO (DEV)',
        channels: [
            { name: 'reporte-bugs', type: ChannelType.GuildText, topic: 'Errores de la web compendio.' },
            { name: 'sugerencias', type: ChannelType.GuildText, topic: 'Ideas para el desarrollo.' }
        ]
    },
    {
        name: '🔊 SALAS DE JUEGO', // Categoría de Voz
        channels: [
            { name: 'La Taberna (Voz)', type: ChannelType.GuildVoice },
            { name: 'Mesa 1 (Privada)', type: ChannelType.GuildVoice },
            { name: 'Mesa 2 (Privada)', type: ChannelType.GuildVoice },
            { name: 'Planificación DM', type: ChannelType.GuildVoice }
        ]
    }
];

client.once('ready', async () => {
    console.log(`[BOT] Conectado como ${client.user.tag}`);

    const guild = await client.guilds.fetch(GUILD_ID);
    if (!guild) {
        console.error('[ERROR] Guild no encontrada');
        process.exit(1);
    }

    console.log(`[CONFIG] Optimizando servidor: ${guild.name}`);
    await guild.channels.fetch(); // Pre-load cache

    // 1. Crear Roles de Sistema
    console.log('\n--- 1. Actualizando Roles ---');
    for (const roleConf of ROLES_CONFIG) {
        let role = guild.roles.cache.find(r => r.name === roleConf.name);
        if (!role) {
            try {
                role = await guild.roles.create({
                    name: roleConf.name,
                    color: roleConf.color,
                    permissions: roleConf.permissions || [],
                    reason: 'Roles de sistema'
                });
                console.log(`[ROL] Creado: ${roleConf.name}`);
            } catch (e) {
                console.error(`[ERROR] Rol ${roleConf.name}: ${e.message}`);
            }
        }
    }

    // 2. Crear Estructura de Canales
    console.log('\n--- 2. Reestructurando Canales ---');
    for (const cat of OPTIMIZED_STRUCTURE) {
        let category = guild.channels.cache.find(c => c.name === cat.name && c.type === ChannelType.GuildCategory);

        // Crear Categoría si no existe
        if (!category) {
            try {
                category = await guild.channels.create({
                    name: cat.name,
                    type: ChannelType.GuildCategory
                });
                console.log(`[CAT] Nueva categoría: ${cat.name}`);
            } catch (e) {
                console.error(`[ERROR] Categoría ${cat.name}: ${e.message}`);
                continue;
            }
        }

        // Crear Canales dentro
        for (const chan of cat.channels) {
            const existingChan = guild.channels.cache.find(c => c.name === chan.name); // Busqueda global simple para evitar duplicados si se movió

            if (!existingChan) {
                try {
                    await guild.channels.create({
                        name: chan.name,
                        type: chan.type,
                        parent: category.id,
                        topic: chan.topic || ''
                    });
                    console.log(`   [CANAL] Creado: ${chan.name}`);
                } catch (e) {
                    console.error(`   [ERROR] Canal ${chan.name}: ${e.message}`);
                }
            } else {
                // Si existe, intentamos moverlo a la categoría correcta y actualizar topic
                if (existingChan.parentId !== category.id) {
                    await existingChan.setParent(category.id);
                    console.log(`   [MOVE] Canal ${chan.name} movido a ${cat.name}`);
                }
                if (chan.topic && existingChan.topic !== chan.topic && existingChan.isTextBased()) {
                    await existingChan.edit({ topic: chan.topic });
                    console.log(`   [TOPIC] Topic actualizado en ${chan.name}`);
                }
            }
        }
    }

    // 3. Publicar Reglas (Actualizadas)
    // Omitido para no spammear, el usuario puede borrar el mensaje anterior manualmente si quiere regenerarlo.
    // Solo actualizamos #roles-auto con un mensaje informativo
    const rolesChannel = guild.channels.cache.find(c => c.name === 'roles-auto');
    if (rolesChannel && rolesChannel.isTextBased()) {
        const msgs = await rolesChannel.messages.fetch({ limit: 1 });
        if (msgs.size === 0) {
            const roleEmbed = new EmbedBuilder()
                .setColor(0x3B82F6)
                .setTitle('🎭 AUTO-ASIGNACIÓN DE ROLES')
                .setDescription('Reacciona a este mensaje (si tuviéramos un bot de reacciones) o pide a un admin tu rol de sistema preferido para ver los canales correspondientes.\n\n🔵 **Jugador**\n🐲 **Dungeon Master**\n📜 **D&D 3.5**\n🔥 **D&D 5e**\n🗺️ **Pathfinder**');

            await rolesChannel.send({ embeds: [roleEmbed] });
            console.log('[ROLES] Mensaje de roles publicado.');
        }
    }

    console.log('\n[FIN] Optimización completada.');
    process.exit(0);
});

client.login(BOT_TOKEN);
