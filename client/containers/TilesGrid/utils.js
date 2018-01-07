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
export default function mapTilesToState(tiles, state) {
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
    // that they merged and flags them as merged.
    if (tile.fromMerge) {
      const tile1 = newState.find(stateTile => stateTile.id === tile.fromMerge.tile1);
      tile1.position.x = calculateX(tile.x);
      tile1.position.y = calculateY(tile.y);
      tile1.justSpawned = false;
      tile1.isMerged = true;
      const tile2 = newState.find(stateTile => stateTile.id === tile.fromMerge.tile2);
      tile2.position.x = calculateX(tile.x);
      tile2.position.y = calculateY(tile.y);
      tile2.justSpawned = false;
      tile2.isMerged = true;
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
