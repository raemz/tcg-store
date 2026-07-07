import { DbClient } from "../db/types"

export async function upsertCardSet(
    db: DbClient,
    gameId: number,
    set: any
) {
    return db.cardSet.upsert({
        where: {
            code: set.name,
        },
        update: {
            name: set.name,
            releaseDate: set.releaseDate,
        },
        create: {
            gameId,
            name:set.name,
            code: set.code,
            releaseDate: set.releaseDate
        }
    })
}