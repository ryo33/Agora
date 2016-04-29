import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Route, Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger';
import { persistStore, getStoredState } from 'redux-persist'

import { Application, Account, UserList, AddUser } from './components/index'
import SignIn from './components/SignIn'

import { createAccountChannel } from 'socket'
import reducers from './reducers/index'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const logger = createLogger();

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(logger, routerMiddleware(browserHistory))
)
const history = syncHistoryWithStore(browserHistory, store)

createAccountChannel(store)

// Persist
const persistConfig = {
    whitelist: ['account'],
}
persistStore(store, persistConfig)
getStoredState(persistConfig, (err, state) => {
    if (state.account) {
        if (state.account.currentUser) {
            window.accountChannel.push('set_current_user', state.account.currentUser)
        }
    }
})

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
