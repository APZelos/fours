import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Components
import Button from '../client/components/Button';
import Span from '../client/components/Span';

storiesOf('Buttons', module).add('button', () => <Button>Button</Button>);
storiesOf('Spans', module).add('span', () => <Span>Span</Span>);
