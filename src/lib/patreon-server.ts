export async function getPatronCount(): Promise<number | null> {
    const campaignId = process.env.PATREON_CAMPAIGN_ID;
    const accessToken = process.env.PATREON_CREATOR_ACCESS_TOKEN;

    if (!campaignId || !accessToken) {
        console.warn('Missing Patreon configuration (PATREON_CAMPAIGN_ID or PATREON_CREATOR_ACCESS_TOKEN)');
        return null;
    }

    try {
        const response = await fetch(`https://www.patreon.com/api/oauth2/v2/campaigns/${campaignId}?fields[campaign]=patron_count`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!response.ok) {
            console.error(`Patreon API Error: ${response.status} ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        return data.data?.attributes?.patron_count || null;
    } catch (error) {
        console.error('Error fetching patron count:', error);
        return null;
    }
}
