import { Client } from 'discord.js-selfbot-v13';
import { joinVoiceChannel } from '@discordjs/voice';
import express from 'express';

const VOICE_CHANNEL_ID = process.env.VOICE_CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PORT = process.env.PORT || 3000;

const client = new Client({
    checkUpdate: false,
});
const app = express();

async function connect() {
    try {
        const guild = await client.guilds.fetch(GUILD_ID);
        const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

        if (channel && channel.isVoice()) {
            joinVoiceChannel({
                channelId: channel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: true,
                selfMute: true,
            });
        }
    } catch (error) {
        setTimeout(connect, 10000);
    }
}

client.on('ready', async () => {
    console.log(`Logado com sucesso como ${client.user.tag}!`);
    await connect();
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (newState.member.id === client.user.id) {
        if (oldState.channelId && !newState.channelId) {
            setTimeout(async () => {
                await connect();
            }, 2000);
        }
    }
});

await client.login(ACCESS_TOKEN);

app.get('/', (req, res) => {
    res.send('Bot está online!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});