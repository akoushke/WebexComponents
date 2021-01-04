import React from 'react';
import ReactDOM from 'react-dom';
import people from '../data';
import {WebexAvatar, WebexDataProvider, WebexJSONAdapter} from '@webex/components';

const adapter = new WebexJSONAdapter({}); // jsonData represents an opened file

ReactDOM.render(
  <WebexDataProvider adapter={adapter}>
    <WebexAvatar personID="XYZ" />,
  </WebexDataProvider>,
  document.getElementById('root')
);