import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home/index';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    {/* <Switch> */}
      <Route exact path="/" component={Home} />
    {/* </Switch> */}
  </HashRouter>
), document.getElementById('root'));
