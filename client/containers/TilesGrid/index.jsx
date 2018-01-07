import React from 'react';
import PropTypes from 'prop-types';
import mapTilesToState from './utils';
import Tile from '../../components/Tile';
import Grid from '../../components/Grid';
import Wrapper from './Wrapper';

/**
 * Holds a queue of state changes
 * in case of a new one comes while
 * the last on is being resolved.
 */
const queue = [];

export default class TilesGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tiles: [],
      isWorking: false,
    };

    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.getNextOnQueue = this.getNextOnQueue.bind(this);
    this.doWork = this.doWork.bind(this);
    this.resolveNewState = this.resolveNewState.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler, false);
    this.doWork(this.props.tiles);
  }

  componentWillReceiveProps(nextProps) {
    this.doWork(nextProps.tiles);
  }

  /**
   * Gets the next state changes on queue.
   * If no state changes exist sets isWorking to false.
   */
  getNextOnQueue() {
    const nextOnQueue = queue.shift();
    if (!nextOnQueue) {
      this.setState({ isWorking: false });
    }
    return nextOnQueue;
  }

  /**
   * If no state changes is on queue proceeds to resolve the new state,
   * otherwise puts state changes (propTiles) on queue.
   *
   * @param {*} propTiles the tiles provided by the props.
   */
  doWork(propTiles) {
    if (!propTiles) {
      return;
    }
    if (this.state.isWorking) {
      queue.push(propTiles);
      return;
    }
    this.setState({ isWorking: true });
    this.resolveNewState(propTiles);
  }

  /**
   * Gets the prop tiles and resolves teh new state.
   *
   * @param {Array} propTiles the tiles provided by the props.
   */
  resolveNewState(propTiles) {
    if (propTiles.length === 0) {
      this.setState({ tiles: [], isWorking: false });
      return;
    }
    // Resolves the state without the tiles that
    // spawned from merge.
    const newState = mapTilesToState(propTiles, this.state.tiles);
    // Filters out the tiles that must be removed because of merge.
    const tilesAfterMerge = newState.filter(tile => !tile.isMerged);
    this.setState({ tiles: newState });
    // If no merged happen stop.
    if (tilesAfterMerge.length === newState.length) {
      // Check if any state change is pending
      // and proceed to resolve it after moe animation is over.
      setTimeout(() => {
        const nextOnQueue = this.getNextOnQueue();
        if (nextOnQueue) {
          this.resolveNewState(nextOnQueue);
        }
      }, 200);
      return;
    }
    // After the move animations ends
    // remove tiles that merged.
    setTimeout(() => {
      this.setState({ tiles: tilesAfterMerge });
      // Check if any state change is pending
      // and proceed to resolve it after moe animation is over.
      setTimeout(() => {
        const nextOnQueue = this.getNextOnQueue();
        if (nextOnQueue) {
          this.resolveNewState(nextOnQueue);
        }
      }, 200);
    }, 200);
  }

  keyDownHandler(e) {
    if (this.state.isWorking) return;
    // If -> or D move to the right.
    if (e.keyCode === 39 || e.keyCode === 68) {
      this.props.move({
        x: 1,
        y: 0,
      });
    }
    // If <- or A move to the left.
    if (e.keyCode === 37 || e.keyCode === 65) {
      this.props.move({
        x: -1,
        y: 0,
      });
    }
    // If <- or A move to the top.
    if (e.keyCode === 38 || e.keyCode === 87) {
      this.props.move({
        x: 0,
        y: -1,
      });
    }
    // If ^ or W move to the bottom.
    if (e.keyCode === 40 || e.keyCode === 83) {
      this.props.move({
        x: 0,
        y: 1,
      });
    }
  }

  render() {
    return (
      <Wrapper>
        <div>
          {this.state.tiles.map(tile => (
            <Tile
              key={tile.id}
              value={tile.value}
              position={tile.position}
              justSpawned={tile.justSpawned}
            />
          ))}
        </div>
        <Grid size={16} />
      </Wrapper>
    );
  }
}

TilesGrid.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  move: PropTypes.func.isRequired,
};
