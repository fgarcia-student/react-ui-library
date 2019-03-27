import React from 'react';
import { storiesOf } from '@storybook/react';

import { NavBar } from '../components/NavBar';
import { wInfo } from '../../utils';

const twoTabs = {
  first: {
    title: 'First Tab',
    color: 'red',
    onActive: () => {
      console.log('First tab active');
    },
    onLeave: () => {
      console.log('First tab leave');
    }
  },
  second: {
    title: 'Second Tab',
    color: 'green',
    onActive: () => {
      console.log('Second tab active');
    },
    onLeave: () => {
      console.log('Second tab leave');
    }
  }
};

const fourIconTabs = {
  first: {
    title: 'First Tab',
    color: 'red',
    icon: (
      <img height={25} src="https://img.icons8.com/ios/50/000000/search.png" />
    ),
    onActive: () => {
      console.log('First tab active');
    },
    onLeave: () => {
      console.log('First tab leave');
    }
  },
  second: {
    title: 'Second Tab',
    color: 'lightblue',
    icon: (
      <img
        height={25}
        src="https://img.icons8.com/ios/24/000000/conference-call.png"
      />
    ),
    onActive: () => {
      console.log('Second tab active');
    },
    onLeave: () => {
      console.log('Second tab leave');
    }
  },
  third: {
    title: 'Third Tab',
    color: 'green',
    icon: (
      <img height={25} src="https://img.icons8.com/ios/24/000000/inbox.png" />
    ),
    onActive: () => {
      console.log('Third tab active');
    },
    onLeave: () => {
      console.log('Third tab leave');
    }
  },
  fourth: {
    title: '4 Tab',
    color: 'darkgrey',
    icon: (
      <img
        height={25}
        src="https://img.icons8.com/ios/50/000000/settings-3.png"
      />
    ),
    onActive: () => {
      console.log('4 tab active');
    },
    onLeave: () => {
      console.log('4 tab leave');
    }
  }
};

storiesOf('Components/NavBar', module)
  .addDecorator(
    wInfo(`

    ### Notes

    This is a Navigation Bar.

    If Icons are provided they will animate up on tab selection.

    For best results, restrict Icon size to 25x25
  `)
  )
  .addWithJSX('2 Tabs fullscreen', () => (
    <NavBar tabs={twoTabs} fullWidth={true} />
  ))
  .addWithJSX('4 Tabs with Icons', () => (
    <NavBar tabs={fourIconTabs} defaultActiveTab="second" />
  ));
