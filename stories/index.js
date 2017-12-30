import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import '../client/globalStyles';
// Components
import Tile from '../client/components/Tile';

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
