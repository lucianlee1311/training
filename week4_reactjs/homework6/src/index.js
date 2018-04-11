import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/Home/index';
import Books from './containers/Books/index';
import BookDetail from './containers/Books/bookDetail';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/books" component={Books} />
      <Route path="/book/:id" component={BookDetail} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));

// module.hot.accept();
