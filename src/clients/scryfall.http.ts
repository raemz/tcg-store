const BASE_URL = "https://api.scryfall.com";

const DEFAULT_HEADERS = {
    "User-Agent": "tcg-store/1.0 (patrickeman12@gmail.com)",
    "Accept": "application/json",
}

export async function scryfallFetch(path: string, init: RequestInit = {}) {
    const url = path.startsWith("http") ? path : `${BASE_URL}${path}`

    const res = await fetch(url, {
        ...init,
        headers: {
            ...DEFAULT_HEADERS,
            ...init.headers,
        }
    });

    if (!res.ok) {
        const body = await res.text().catch(() => "");
        throw new Error(`Scryfall request failed: ${res.status} ${res.statusText} - ${body}`);
    }

    return res.json();
}