import { Client } from 'discord.js-selfbot-v13';
import { joinVoiceChannel } from '@discordjs/voice';

const client = new Client({
    checkUpdate: false,
});

const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

client.once('ready', async () => {
    console.log(`Logado com sucesso como ${client.user.tag}!`);

    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

        if (channel && channel.isVoice()) {
            const _ = joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: true,
            });

            console.log(`Conectado com sucesso ao canal de voz: ${channel.name}`);
        } else {
            console.log('Canal de voz não encontrado ou inválido.');
        }
    } catch (error) {
        console.error('Erro ao tentar entrar no canal de voz:', error);
    }
});

await client.login(ACCESS_TOKEN);