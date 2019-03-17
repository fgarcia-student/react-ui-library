import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number, color } from '@storybook/addon-knobs/react';

import { Toggle } from '../components/Toggle';
import { wInfo } from '../../utils';

storiesOf('Components/Toggle', module)
  .addDecorator(
    wInfo(`

    ### Notes

    This is a toggle that contains two states.
  `)
  )
  .addWithJSX('All defaults', () => <Toggle />)
  .addWithJSX('All options', () => (
    <Toggle
      borderColorInactive={color('borderColorInactve', '#979797')}
      borderColorActive={color('borderColorActive', '#979797')}
      backgroundColorInactive={color('backgroundColorInactive', '#C8C8C8')}
      backgroundColorActive={color('backgroundColorActive', '#C8C8C8')}
      indicatorColorInactive={color('indicatorColorInactive', '#D8D8D8')}
      indicatorColorActive={color('indicatorColorActive', '#D8D8D8')}
      size={number('size', 200)}
      defaultState={boolean('defaultState', false)}
      disabled={boolean('disabled', false)}
      onToggleOn={() => console.log('Toggled On')}
      onToggleOff={() => console.log('Toggled Off')}
      onToggle={state => console.log(`Toggled: ${state}`)}
    />
  ))
  .addWithJSX('Dark theme', () => (
    <Toggle
      borderColorInactive={color('borderColor', '#9013FE')}
      backgroundColorInactive={color('backgroundColor', '#3A1F61')}
      indicatorColorInactive={color('indicatorColor', '#222121')}
      size={number('size', 200)}
      defaultState={boolean('defaultState', false)}
      disabled={boolean('disabled', false)}
      onToggleOn={() => console.log('Toggled On')}
      onToggleOff={() => console.log('Toggled Off')}
      onToggle={state => console.log(`Toggled: ${state}`)}
    />
  ))
  .addWithJSX('Active / Inactive Styles', () => (
    <Toggle
      borderColorInactive={color('borderColorInactive', '#A01616')}
      borderColorActive={color('borderColorActive', '#497417')}
      backgroundColorInactive={color('backgroundColorInactive', '#A72B2B')}
      backgroundColorActive={color('backgroundColorActive', '#385319')}
      indicatorColorInactive={color('indicatorColorInactive', '#521212')}
      indicatorColorActive={color('indicatorColorActive', '#509206')}
      size={number('size', 200)}
      defaultState={boolean('defaultState', false)}
      disabled={boolean('disabled', false)}
      onToggleOn={() => console.log('Toggled On')}
      onToggleOff={() => console.log('Toggled Off')}
      onToggle={state => console.log(`Toggled: ${state}`)}
    />
  ));
