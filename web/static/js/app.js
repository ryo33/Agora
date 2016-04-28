import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Application, Account, UserList, AddUser } from './components/index'
import SignIn from './components/SignIn'

import 'socket'
import reducers from './reducers/index'

import injectTapEventPlugin from 'react-tap-event-plugin'
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
        <Router history={history}>
            <Route path="/" component={Application}>
                <Route path="account" component={Account}>
                    <Route path="users" component={UserList} />
                    <Route path="add-user" component={AddUser} />
                </Route>
                <Route path="signin" component={SignIn} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
)
