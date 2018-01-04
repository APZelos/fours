import uuidv4 from 'uuid/v4';
import { NEW_GAME, MOVE } from '../actionTypes';

const grid = [[{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}], [{}, {}, {}, {}]];

/**
 * Gets a random number between zero
 * and the given number.
 *
 * @param {Number} num the max number.
 */
function getRandomBetween0And(num) {
  return Math.floor(Math.random() * num);
}

/**
 * Loops the grid and calls a callback with the indexes
 * of the current grid item.
 *
 * @param {Function} callback the callback function. Return true to break.
 */
function loopGrid(callback) {
  let mustBreak = false;
  for (let i = 0; i < 4; i++) {
    if (mustBreak) break;
    for (let j = 0; j < 4; j++) {
      mustBreak = callback(j, i);
      if (mustBreak) break;
    }
  }
}

/**
 * Clears the grid.
 */
function clearGrid() {
  loopGrid((x, y) => {
    grid[y][x] = undefined;
  });
}

/**
 * Returns all empty cells on the grid.
 */
function getAllEmptyCells() {
  const cells = [];

  loopGrid((x, y) => {
    if (!grid[y][x]) {
      cells.push({
        x,
        y,
      });
    }
  });

  return cells;
}

/**
 * Finds the position of
 * a random empty cell.
 * Returns undefined if no empty cell exist.
 */
function getRandomEmptyCell() {
  const emptyCells = getAllEmptyCells();
  if (emptyCells.length === 0) return undefined;

  const randomIndex = getRandomBetween0And(emptyCells.length);
  const cell = emptyCells[randomIndex];

  return cell;
}

/**
 * Spawns a new tile in a random empty cell.
 * Returns undefined if there is no room for a new tile.
 */
function spawnTile() {
  const id = uuidv4();
  const value = Math.random() >= 0.9 ? 4 : 2;
  const cell = getRandomEmptyCell();

  if (!cell) return undefined;

  const tile = {
    id,
    value,
    x: cell.x,
    y: cell.y,
  };

  grid[cell.y][cell.x] = {
    id,
    value,
  };

  return tile;
}

/**
 * Resets the grid for a new game.
 */
function newGame() {
  clearGrid();
  const tiles = [];

  for (let i = 0; i < 2; i++) {
    const tile = spawnTile();
    tiles.push(tile);
  }

  return tiles;
}

/**
 * Tries to move the tile to given direction.
 * A tile can be moved to the next cell if:
 *  * next cell is empty
 *  * next cell is not empty, the tile in the next cell has
 *    the same value and the moving tile is not spawned from merge.
 *
 * @param {Object} tile the moving tile.
 * @param {object} direction the direction of the movement.
 */
function tryToMoveTile(tile, direction) {
  // Calculates the position of the next cell
  // in the direction of the movement.
  const x = tile.x + direction.x;
  const y = tile.y + direction.y;

  // If next cell is out of bound stop.
  if (x > 3 || y > 3 || x < 0 || y < 0) {
    return undefined;
  }

  const cell = grid[y][x];

  // If next cell is empty
  // move this tile to the next cell.
  if (!cell) {
    return {
      id: tile.id,
      value: tile.value,
      x,
      y,
      fromMerge: tile.fromMerge,
    };
  }

  // Checks tile in the next cell has the same value
  // and this tile is not from merge that happened in
  // in this move merge the tiles.
  if (cell.value === tile.value && !tile.fromMerge && !cell.fromMerge) {
    grid[y][x] = undefined;
    return {
      id: uuidv4(),
      value: tile.value * 2,
      x,
      y,
      fromMerge: {
        tile1: tile.id,
        tile2: cell.id,
      },
    };
  }

  return undefined;
}

/**
 * Checks if any of the tiles can be moved
 * in the next move.
 */
function checkIfAnyTileCanMove() {
  let canAnyTileMove = false;
  loopGrid((x, y) => {
    if (canAnyTileMove) return;

    const cell = grid[y][x];
    const tile = {
      id: cell.id,
      value: cell.value,
      x,
      y,
    };
    // Checks move to the right.
    const canMoveRight = !!tryToMoveTile(tile, { x: 1, y: 0 });
    canAnyTileMove = canAnyTileMove || canMoveRight;
    if (canAnyTileMove) return;
    // Checks move to the left.
    const canMoveLeft = !!tryToMoveTile(tile, { x: -1, y: 0 });
    canAnyTileMove = canAnyTileMove || canMoveLeft;
    if (canAnyTileMove) return;
    // Checks move to the top.
    const canMoveUp = !!tryToMoveTile(tile, { x: 0, y: -1 });
    canAnyTileMove = canAnyTileMove || canMoveUp;
    if (canAnyTileMove) return;
    // Checks move to the bottom.
    const canMoveDown = !!tryToMoveTile(tile, { x: 0, y: 1 });
    canAnyTileMove = canAnyTileMove || canMoveDown;
  });

  return canAnyTileMove;
}

/**
 * Tries to move all the tiles to the given direction.
 * If at least one tile moves spawns a new tile.
 *
 * @param {Object} direction the direction of movement.
 */
function move(direction) {
  let hasAnyTileMoved = false;
  const movingAxis = direction.x !== 0 ? 'x' : 'y';
  const fixedAxis = direction.x === 0 ? 'x' : 'y';
  const tiles = [];
  const axes = {
    x: direction.x,
    y: direction.y,
  };
  axes[movingAxis] = direction[movingAxis] > 0 ? 3 : 0;

  while (axes[fixedAxis] < 4) {
    while (axes[movingAxis] >= 0 && axes[movingAxis] < 4) {
      const cell = grid[axes.y][axes.x];

      if (cell) {
        // Resets from merge.
        cell.fromMerge = undefined;

        let result = {};
        let tile = {
          id: cell.id,
          value: cell.value,
          x: axes.x,
          y: axes.y,
        };

        while (result && tile[movingAxis] < 4 && tile[movingAxis] >= 0) {
          result = tryToMoveTile(tile, direction);
          if (result) {
            hasAnyTileMoved = true;
            tile = result;
          }
        }

        grid[axes.y][axes.x] = undefined;
        grid[tile.y][tile.x] = {
          id: tile.id,
          value: tile.value,
          fromMerge: tile.fromMerge,
        };

        tiles.push(tile);
      }

      axes[movingAxis] = direction[movingAxis] > 0 ? axes[movingAxis] - 1 : axes[movingAxis] + 1;
    }

    axes[movingAxis] = direction[movingAxis] > 0 ? 3 : 0;
    axes[fixedAxis] += 1;
  }

  if (hasAnyTileMoved) {
    const newTile = spawnTile();
    if (newTile) tiles.push(newTile);
  }
  return tiles;
}

const tiles = (state = [], action) => {
  switch (action.type) {
    case NEW_GAME: {
      const newState = newGame();
      return newState;
    }
    case MOVE: {
      const newState = move(action.direction);
      const emptyCells = getAllEmptyCells();
      if (emptyCells.length === 0) {
        const canAnyTileMove = checkIfAnyTileCanMove();
        if (!canAnyTileMove) return [];
      }
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default tiles;
