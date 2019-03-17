import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../utils';

storiesOf('Welcome', module)
  .addDecorator(
    wInfo(`

    ### Notes

    Hello world!

    ### To use this Storybook

    Explore the panels on the left.
  `)
  )
  .add('to your new Storybook 🥰', () => (
    <div>This is an example component</div>
  ));
