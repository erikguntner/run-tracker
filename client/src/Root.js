/* eslint no-underscore-dangle: "off" , react/display-name: "off" */

import React from 'react';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';
import watcherSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  reduxDevTools = a => a;
}

// We can now use this provider tag to power our application,
// but also wrap our render testing components as well.
export default ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    {
      auth: {
        authenticated: localStorage.getItem('token'),
      },
    },
    compose(
      applyMiddleware(sagaMiddleware),
      reduxDevTools
    )
  );

  sagaMiddleware.run(watcherSaga);

  return <Provider store={store}>{children}</Provider>;
};
