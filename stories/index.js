import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object, array } from '@storybook/addon-knobs/react';
import uuidv4 from 'uuid/v4';
import '../client/globalStyles';
// Components
import Grid from '../client/components/Grid';
import Tile from '../client/components/Tile';
import Container from '../client/components/Container';
// Containers
import TilesGird from '../client/containers/TilesGrid';

storiesOf('Grid', module)
  .add('Grid', () => <Grid size={16} />)
  .add('Tiles Grid', () => {
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
    return <TilesGird tiles={tiles} />;
  });

// Tiles
const tilesStories = storiesOf('Tiles', module);
tilesStories.addDecorator(withKnobs);
tilesStories
  .add('Base (2)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={2} position={object('position', position)} />;
  })
  .add('Regular (4 - 64)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={4} position={object('position', position)} />;
  })
  .add('Copper (128)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={128} position={object('position', position)} />;
  })
  .add('Brass (236)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={236} position={object('position', position)} />;
  })
  .add('Gold (472 - 944)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={472} position={object('position', position)} />;
  })
  .add('Pure Gold (> 944)', () => {
    const position = {
      x: 10,
      y: 10,
    };
    return <Tile value={1888} position={object('position', position)} />;
  });
