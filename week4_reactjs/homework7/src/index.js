import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './containers/index';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
import reducerApp from './reducers';
// import thunk from 'redux-thunk';

// const middleware = [ thunk ];

// let store = createStore(reducerApp);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducerApp, composeEnhancers(
  // applyMiddleware(...middleware),
));

// store.dispatch(getAllProducts());

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
  // <Provider store={store}>
  //   <HashRouter>
  //     <Switch>
  //       <Route exact path="/" component={Home} />
  //       <Route path="/books" component={App} />
  //       <Route path="/books" component={BooksContainer} />
  //     </Switch>
  //   </HashRouter>
  // </Provider>
), document.getElementById('root'));

// ReactDOM.render((
//   <Provider store={store}>
//     <HashRouter>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/books" component={Books} />
//         <Route path="/book/:id" component={BookDetail} />
//         <Route path="/shoppingcart" component={ShoppingCart} />
//       </Switch>
//     </HashRouter>
//   </Provider>
// ), document.getElementById('root'));

// module.hot.accept();
