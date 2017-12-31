import React from 'react';
import uuidv4 from 'uuid/v4';
import Wrapper from './Wrapper';
import Container from '../../components/Container';
import ContainerItem from '../../components/ContainerItem';
import Manual from './Manual';
import Score from './Score';
import Github from './Github';
import TilesGrid from '../TilesGrid';

const tiles = [
  {
    id: uuidv4(),
    x: 0,
    y: 0,
    value: 2,
  },
  {
    id: uuidv4(),
    x: 1,
    y: 0,
    value: 8,
  },
  {
    id: uuidv4(),
    x: 2,
    y: 0,
    value: 236,
  },
  {
    id: uuidv4(),
    x: 3,
    y: 0,
    value: 472,
  },
  {
    id: uuidv4(),
    x: 0,
    y: 1,
    value: 4,
  },
  {
    id: uuidv4(),
    x: 2,
    y: 1,
    value: 128,
  },
  {
    id: uuidv4(),
    x: 0,
    y: 2,
    value: 1888,
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 6216,
    };
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
            <TilesGrid tiles={tiles} />
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
