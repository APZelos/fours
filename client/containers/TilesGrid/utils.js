/**
 * Calculates the x position
 * of the tile in pixels
 * based on its grid x position.
 */
function calculateX(x) {
  const width = x * 100;
  const xGap = x * 15;
  return width + xGap;
}

/**
 * Calculates the y position
 * of the tile in pixels
 * based on its grid y position.
 */
function calculateY(y) {
  const height = y * 150;
  const yGap = y * 10;
  return height + yGap;
}

/**
 * Maps tiles to state
 * and returns the new state.
 *
 * @param {Array} tiles the tiles that will be mapped.
 * @param {Array} state the tiles from previous state.
 */
export function mapTilesToState(tiles, state) {
  const newState = [...state];

  tiles.forEach((tile) => {
    // Search if tile already exist in state and if so updates it.
    const result = newState.find(stateTile => stateTile.id === tile.id);
    if (result) {
      result.position.x = calculateX(tile.x);
      result.position.y = calculateY(tile.y);
      result.justSpawned = false;
      return;
    }

    // If tile spawned from merge
    // moves the merged tiles to the position
    // that they merged.
    if (tile.fromMerge) {
      const tile1 = newState.find(stateTile => stateTile.id === tile.fromMerge.tile1);
      tile1.position.x = calculateX(tile.x);
      tile1.position.y = calculateY(tile.y);
      tile1.justSpawned = false;
      const tile2 = newState.find(stateTile => stateTile.id === tile.fromMerge.tile2);
      tile2.position.x = calculateX(tile.x);
      tile2.position.y = calculateY(tile.y);
      tile2.justSpawned = false;
      return;
    }

    // Creates a new tile and adds it
    // to new state.
    newState.push({
      id: tile.id,
      value: tile.value,
      position: {
        x: calculateX(tile.x),
        y: calculateY(tile.y),
      },
      justSpawned: true,
    });
  });

  return newState;
}

/**
 * Removes the merged tiles
 * and add the tiles spawned from the merge.
 *
 * @param {Array} tilesFromMerge the tiles spawned from the merge.
 * @param {Array} stateBeforeMerge the state before the merge.
 */
export function mergeTiles(tilesFromMerge, stateBeforeMerge) {
  // If not tiles from merge exist stop.
  if (!tilesFromMerge || tilesFromMerge.length === 0) return undefined;

  let stateAfterMerge = [...stateBeforeMerge];
  tilesFromMerge.forEach((tileFromMerge) => {
    // Removes the merged tiles.
    stateAfterMerge = stateAfterMerge.filter(tile =>
      tile.id !== tileFromMerge.fromMerge.tile1 && tile.id !== tileFromMerge.fromMerge.tile2);
    // Adds the tile that spawned from merge.
    stateAfterMerge.push({
      id: tileFromMerge.id,
      value: tileFromMerge.value,
      position: {
        x: calculateX(tileFromMerge.x),
        y: calculateY(tileFromMerge.y),
      },
    });
  });

  return stateAfterMerge;
}
