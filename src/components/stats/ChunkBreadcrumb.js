/*
 * @flow
 */

import type {RawStats} from '../../types/Stats';

import getChunksById from '../../stats/getChunksById';
import getParentChunkIds from '../../stats/getParentChunkIds';
import React from 'react';

type Props = {
  stats: RawStats,
  selectedChunkId: number,
};

export default function ChunkBreadcrumb(props: Props) {
  const parentChunkIds = getParentChunkIds(
    props.stats,
    props.selectedChunkId,
  );

  if (!parentChunkIds) {
    return null;
  }

  const chunksById = getChunksById(props.stats.chunks);

  return (
    <ol className="breadcrumb">
      {parentChunkIds.map((chunkId) => (
        <li
          key={chunkId}
          className={props.selectedChunkId === chunkId ? 'active' : ''}>
          {chunksById[chunkId].names.join(', ')} ({String(chunkId)})
        </li>
      ))}
    </ol>
  )
}