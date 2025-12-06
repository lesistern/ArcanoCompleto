interface DiscordWidgetData {
    id: string;
    name: string;
    instant_invite: string;
    channels: Array<{
        id: string;
        name: string;
        position: number;
    }>;
    members: Array<{
        id: string;
        username: string;
        status: string;
        avatar_url: string;
    }>;
    presence_count: number;
}

export async function getDiscordStats(): Promise<DiscordWidgetData | null> {
    const guildId = process.env.DISCORD_GUILD_ID;

    if (!guildId) {
        // console.warn('Missing DISCORD_GUILD_ID');
        return null;
    }

    try {
        const response = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            // console.error(`Discord API Error: ${response.status} ${response.statusText}`);
            return null; // Widget likely disabled or ID wrong
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Discord stats:', error);
        return null;
    }
}
