import { Client } from 'discord.js-selfbot-v13';
import { joinVoiceChannel } from '@discordjs/voice';
import express from 'express';

const TARGETS = JSON.parse(process.env.TARGETS);
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PORT = process.env.PORT || 3000;

const client = new Client({ checkUpdate: false });
const app = express();

async function connect({ guildId, channelId }) {
    try {
        const guild = await client.guilds.fetch(guildId);
        const channel = await guild.channels.fetch(channelId);

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
        console.error(`Falha em ${guildId}:`, error.message);
        setTimeout(() => connect({ guildId, channelId }), 10000);
    }
}

client.on('ready', async () => {
    console.log(`Logado com sucesso como ${client.user.tag}!`);
    await Promise.all(TARGETS.map(connect));
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.member.id !== client.user.id) return;
    if (oldState.channelId && !newState.channelId) {
        const target = TARGETS.find(t => t.guildId === oldState.guild.id);
        if (target) setTimeout(() => connect(target), 2000);
    }
});

await client.login(ACCESS_TOKEN);

app.get('/', (req, res) => res.send('Bot está online!'));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));