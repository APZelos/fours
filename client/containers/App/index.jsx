import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { newGame, move } from '../../actions';
import Wrapper from './Wrapper';
import Container from '../../components/Container';
import ContainerItem from '../../components/ContainerItem';
import Manual from './Manual';
import Score from './Score';
import Github from './Github';
import TilesGrid from '../TilesGrid';

const mapStateToProps = state => ({
  tiles: state.tiles,
});

const mapDispatchToProps = dispatch => ({
  newGame() {
    const action = newGame();
    dispatch(action);
  },
  move(direction) {
    const action = move(direction);
    dispatch(action);
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 6216,
    };
  }

  componentDidMount() {
    this.props.newGame();
  }

  render() {
    return (
      <Wrapper>
        <Container>
          <ContainerItem column="1" row="1">
            Score
          </ContainerItem>
          <Score column="2" row="1">
            {this.state.score}
          </Score>
          <ContainerItem column="1 / span 2" row="2">
            <TilesGrid tiles={this.props.tiles} move={this.props.move} />
          </ContainerItem>
          <Manual column="1 / span 2" row="3">
            Move tiles by pressing arrow keys or WASD
          </Manual>
          <Github column="2" row="4">
            github
          </Github>
        </Container>
      </Wrapper>
    );
  }
}

App.propTypes = {
  tiles: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  })).isRequired,
  newGame: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
