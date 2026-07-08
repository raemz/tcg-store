// just add available variants in shop here:

export const DEFAULT_CONDITIONS = [
    "NM"
];

export const DEFAULT_LANGUAGE = [
    "English",
];

export const DEFAULT_FOILS = [
    false,
    true,
]

export function generateVariants(printingId: number) {
    const variants = [];

    for(const condition of DEFAULT_CONDITIONS) {
        for(const language of DEFAULT_LANGUAGE) {
            for(const foil of DEFAULT_FOILS) {
                variants.push({
                    printingId,
                    condition,
                    language,
                    foil
                })
            }
        }
    }

    return variants;
}