import React from 'react';
import PropTypes from 'prop-types';
import { mapTilesToState, mergeTiles } from './utils';
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

    this.getNextOnQueue = this.getNextOnQueue.bind(this);
    this.doWork = this.doWork.bind(this);
    this.resolveNewState = this.resolveNewState.bind(this);
  }

  componentDidMount() {
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
    // Resolves the state without the tiles that
    // spawned from merge.
    const newState = mapTilesToState(propTiles, this.state.tiles);
    // Filters out the tiles that spawned from merge
    // and resolves how the state must be after the merge.
    const tilesFromMerge = propTiles.filter(tile => tile.fromMerge);
    const stateAfterMerge = mergeTiles(tilesFromMerge, newState);
    this.setState({ tiles: newState });
    // If no merge happened stop.
    if (!stateAfterMerge) {
      // Check if any state change is pending
      // and proceed to resolve it.
      const nextOnQueue = this.getNextOnQueue();
      if (nextOnQueue) {
        this.resolveNewState(nextOnQueue);
      }
      return;
    }
    // After the animations end update
    // teh state to its after merge form.
    setTimeout(() => {
      this.setState({ tiles: stateAfterMerge });
      // Check if any state change is pending
      // and proceed to resolve it.
      const nextOnQueue = this.getNextOnQueue();
      if (nextOnQueue) {
        this.resolveNewState(nextOnQueue);
      }
    }, 200);
  }

  render() {
    return (
      <Wrapper>
        <div>
          {this.state.tiles.map(tile => (
            <Tile key={tile.id} value={tile.value} position={tile.position} />
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
};
