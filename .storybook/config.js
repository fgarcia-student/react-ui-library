import { configure, addDecorator, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';
import { setConfig } from 'react-hot-loader';

// allow for hooks
setConfig({ pureSFC: true });

// add user facing controls for component
addDecorator(withKnobs);

// add jsx for each component
setAddon(JSXAddon);

// require all stories in stories directory with filename *.stories.js
const req = require.context('../src/stories', true, /.stories.js$/);
const loadStories = () => {
  req.keys().forEach(fileName => req(fileName));
};

configure(loadStories, module);
