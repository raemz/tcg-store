import { DbClient } from "../db/types"

export async function upsertGame(db: DbClient) {
    return db.game.upsert({
        where: {
            identifier: "mtg"
        },
        update: {},
        create: {
            name: "Magic: The Gathering",
            identifier: "mtg"
        }
    })
}