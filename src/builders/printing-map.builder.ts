export function buildPrintingMap(printings: any[]) {
    return new Map<number, number>(
        printings.map(
            (printing: { collectorNumber: number; id: number }): [number, number] => [
                printing.collectorNumber,
                printing.id,
            ]
        )
    );
}