/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { IDocumentAttributes, ISnapshotTree } from "@fluidframework/protocol-definitions";

/**
 * Reads a blob from storage and parses it from JSON.
 *
 * @internal
 */
export type ReadAndParseBlob = <T>(id: string) => Promise<T>;

/**
 * Fetches the sequence number of the snapshot tree by examining the protocol.
 * @param tree - snapshot tree to examine
 * @param readAndParseBlob - function to read blob contents from storage
 * and parse the result from JSON.
 * @internal
 */
export async function seqFromTree(
	tree: ISnapshotTree,
	readAndParseBlob: ReadAndParseBlob,
): Promise<number> {
	const attributesHash = tree.trees[".protocol"].blobs.attributes;
	const attrib = await readAndParseBlob<IDocumentAttributes>(attributesHash);
	return attrib.sequenceNumber;
}
