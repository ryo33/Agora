import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import Agora from './Agora'
import reducers from './reducers/index'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const middleware = routerMiddleware(browserHistory)
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(middleware)
)
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Agora routerHistory={history} />
    </Provider>,
    document.getElementById('container')
)
