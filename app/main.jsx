'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import {render} from 'react-dom';

import { cyan500 } from 'material-ui/styles/colors';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin'
import store from './store';
import Routes from './containers/RoutesContainer';

const muiTheme = getMuiTheme({

})

//injectTapEventPlugin()

require('./stylesheets/style.scss');

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('main')
);
