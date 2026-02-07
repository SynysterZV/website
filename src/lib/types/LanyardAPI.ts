export type LanyardAPI = {
    [key:string]: {
        active_on_discord_desktop: boolean;
        active_on_discord_embeded: boolean;
        active_on_discord_mobile: boolean;
        active_on_discord_web: boolean;
        activities: {
            created_at: number;
            id: string;
            name: string;
            state: string;
            type: number
        }[];
        discord_status: string;
        discord_user: {
            avatar: string;
            avatar_decoration_data: {
                asset: string;
                expires_at: string | null;
                sku_id: string;
            };
            bot: boolean;
            collectibles: string | null;
            discriminator: string;
            display_name: string;
            display_name_styles: string | null;
            global_name: string;
            id: string;
            primary_guild: string | null;
            public_flags: number;
            username: string;
        }
        kv: Record<string, never>
    }
}