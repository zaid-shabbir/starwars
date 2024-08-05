import { Character } from "./character";
import { Planet } from "./planet";

export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[] | Planet[];
}