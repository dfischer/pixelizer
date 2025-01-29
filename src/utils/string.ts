/**
 * The MIT License (MIT)
 *
 * Igor Zinken 2024-2025 - https://www.igorski.nl
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import type { SortSettings } from "@/definitions/types";
import type { SortingType } from "@/filters/sorter/sorting";
import type { IntervalFunction } from "@/filters/sorter/interval";

export const settingToString = ( setting: SortSettings ): string => {
    // sort settings
    const { width, height, angle, randomness, charLength, lowerThreshold, upperThreshold, sortingType, intervalFunction } = setting;

    // post processing parameters
    const { duotone, duotoneColor1, duotoneColor2 } = setting.post;
    const post = `d${duotone ? 1 : 0}_d1${duotoneColor1}_d2${duotoneColor2}`;

    return `a${angle}_l${lowerThreshold.toFixed(2)}_u${upperThreshold.toFixed(2)}_r${randomness.toFixed(2)}_s${sortingType}_i${intervalFunction}_c${charLength.toFixed(2)}_p${post}`;
};

export const stringToSetting = ( string: string ): Omit<SortSettings, "width" | "height"> => {
    const arr = string.split( "_" );
    
    // retrieve all serialized values, note these values still include their one or two character identifier
    const [
        // sort settings
        angle, lowerThreshold, upperThreshold, randomness, sortingType, intervalFunction, charLength,
        // post processing parameters
        duotone, duotoneColor1, duotoneColor2
    ] = arr;

    return {
        angle: parseFloat( angle.substring( 1 )),
        lowerThreshold: parseFloat( lowerThreshold.substring( 1 )),
        upperThreshold: parseFloat( upperThreshold.substring( 1 )),
        randomness: parseFloat( randomness.substring( 1 )),
        sortingType: sortingType.substring( 1 ) as SortingType,
        intervalFunction: intervalFunction.substring( 1 ) as IntervalFunction,
        charLength: parseFloat( charLength.substring( 1 )),
        post: {
            duotone: duotone.substring( 2 ) === "1",
            duotoneColor1: duotoneColor1.substring( 2 ),
            duotoneColor2: duotoneColor2.substring( 2 ),
        },
    };
};