import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Agora } from './agora'
import reducers from './reducers/index'
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Agora routerHistory={history} />
    </Provider>,
    document.getElementById('container')
)
