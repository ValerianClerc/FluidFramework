/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * Converts the given number array into an array of ranges
 * Example: [1, 2, 3, 4, 5, 6] to [[1, 6]]
 * [1, 2, 3, 5, 6] to [[1,3],[5,6]]
 * @internal
 */
export function convertSortedNumberArrayToRanges(numberArray: number[]): number[][] {
	const ranges: number[][] = [];
	if (!numberArray?.length) {
		return ranges;
	}
	let begin: number = numberArray[0];
	let end: number = numberArray[0];
	for (let i = 1; i < numberArray.length; i++) {
		const elem = numberArray[i];
		if (elem - end !== 1) {
			ranges.push([begin, end]);
			begin = elem;
			end = elem;
		} else {
			end = elem;
		}
	}
	// Last range
	ranges.push([begin, end]);
	return ranges;
}
