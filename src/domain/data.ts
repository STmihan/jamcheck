export const JAM_URL = "https://itch.io/jam/{}/entries.json"
export const JAM_ID = "379683"

export interface Batch {
    generated_on: string;
    jam_games: Record[];
}

export interface Record {
    id: number;
    created_at: string;
    coolness: number;
    rating_count: number;
    url: string;
    place: Place | null;
    game: Game;
    contributors: User[];
}

export interface Place {
    by_coolness: number;
    by_ratings_count: number;
    total: number;
}

export interface Game {
    id: number;
    title: string;
    short_text: string;
    gif_cover: string;
    cover_color: string;
    platforms: string[];
    url: string;
    cover: string;
    user: User;
}

export interface User {
    id: number;
    url: string;
    name: string;
}
