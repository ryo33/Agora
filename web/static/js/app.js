import React, { Component } from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { IndexRoute, Route, Router, browserHistory } from 'react-router'
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger';
import { persistStore, getStoredState } from 'redux-persist'

import { Application } from './components/index'
import { Account, UserList, AccountThreads, AccountGroups,
    AddUser, AddThread, AddGroup } from 'components/pages/account/index'
import { ThreadPage, ThreadAll, Thread } from 'components/pages/thread/index'
import { GroupPage, GroupAll, Group,
    GroupGroups, GroupThreads, GroupMembers } from 'components/pages/group/index'
import SignIn from './components/SignIn'
import Unimplemented from 'components/Unimplemented'

import { switchGroupPageTabs } from 'actions/groups'

import { joinAccountChannel, joinCommonChannel } from 'socket'
import reducers from './reducers/index'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const logger = createLogger();

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunk, logger, routerMiddleware(browserHistory))
)
const history = syncHistoryWithStore(browserHistory, store)

joinCommonChannel(store.dispatch)
if (window.signedIn) {
    joinAccountChannel(store.dispatch)
}

// Persist
const persistConfig = {
    whitelist: ['account'],
}
persistStore(store, persistConfig)
getStoredState(persistConfig, (err, state) => {
    if (state.account) {
        if (state.account.currentUser) {
            if (window.signedIn) {
                store.dispatch({
                    type: 'SET_CURRENT_USER',
                    user: state.account.currentUser
                })
                window.accountChannel.push('set_current_user', state.account.currentUser)
            }
        }
    }
})

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Application}>
                <Route path="account" component={Account}>
                    <Route path="users" component={UserList} />
                    <Route path="threads" component={AccountThreads} />
                    <Route path="groups" component={AccountGroups} />
                    <Route path="add-user" component={AddUser} />
                    <Route path="add-thread" component={AddThread} />
                    <Route path="add-group" component={AddGroup} />
                    <Route path="notifications" component={Unimplemented} />
                </Route>
                <Route path="threads" component={ThreadPage}>
                    <IndexRoute component={ThreadAll}/>
                    <Route path=":id" component={Thread} />
                </Route>
                <Route path="groups" component={GroupPage}>
                    <IndexRoute component={GroupAll}/>
                    <Route path=":id" component={Group}>
                        <IndexRoute component={GroupThreads} onEnter={() =>
                            store.dispatch(switchGroupPageTabs('threads'))} />
                        <Route path="threads" component={GroupThreads} onEnter={() =>
                            store.dispatch(switchGroupPageTabs('threads'))} />
                        <Route path="groups" component={GroupGroups || Unimplemented} onEnter={() =>
                            store.dispatch(switchGroupPageTabs('groups'))} />
                        <Route path="members" component={GroupMembers || Unimplemented} onEnter={() =>
                            store.dispatch(switchGroupPageTabs('members'))} />
                    </Route>
                </Route>
                <Route path="posts" component={Unimplemented}>
                    <IndexRoute component={Unimplemented}/>
                    <Route path=":id" component={Unimplemented} />
                </Route>
                <Route path="users" component={Unimplemented}>
                    <IndexRoute component={Unimplemented}/>
                    <Route path=":id" component={Unimplemented} />
                </Route>
                <Route path="signin" component={SignIn} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('container')
)
