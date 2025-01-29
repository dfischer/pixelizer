import type { SortSettings } from "@/definitions/types";

export function createSetting( data: Partial<SortSettings> = {}): SortSettings {
    return {
        width: 300,
        height: 300,
        angle: 0,
        randomness: 0,
        charLength: 10,
        lowerThreshold: 0.25,
        upperThreshold: 0.75,
        sortingType: "lightness",
        intervalFunction: "waves",
        post: {
            duotone: false,
            duotoneColor1: "#FF00FF",
            duotoneColor2: "#FF9900",
            ...(data.post || {})
        },
        ...data,
    };
}