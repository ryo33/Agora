import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogicMiddleware } from 'redux-logic';
import createSagaMiddleware from 'redux-saga';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createLogger from 'redux-logger';
import { persistStore, getStoredState } from 'redux-persist';

import { Application } from './components/index';
import {
  Account, UserList, AccountThreads, AccountGroups, AccountWatchlists,
  AddUser, AddThread, AddGroup, AddWatchlist
} from 'components/pages/account/index';
import { ThreadPage, ThreadAll, Thread } from 'components/pages/thread/index';
import { PostPage, Post } from 'components/pages/post/index';
import { UserPage, User } from 'components/pages/user/index';
import { WatchlistPage, Watchlist } from 'components/pages/watchlist/index';
import {
  GroupPage, GroupAll, Group,
  GroupGroups, GroupThreads, GroupMembers
} from 'components/pages/group/index';
import SignIn from './components/SignIn';
import Unimplemented from 'components/Unimplemented';

import { joinAccountChannel, joinCommonChannel } from 'socket';
import { switchGroupPageTabs } from 'actions/groupPage';
import { updateCurrentUser } from 'actions/accountPage';
import reducers from 'reducers/index';
import rootSaga from 'sagas/index';
import logics from 'logics/index';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const sagaMiddleware = createSagaMiddleware();
const logicMiddleware = createLogicMiddleware(logics);

const middlewares = [sagaMiddleware, logicMiddleware, routerMiddleware(browserHistory)]
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger();
  middlewares.push(logger);
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(...middlewares)
);
const history = syncHistoryWithStore(browserHistory, store);
sagaMiddleware.run(rootSaga, store.getState);

joinCommonChannel(store.dispatch);
if (window.signedIn) {
  joinAccountChannel(store.dispatch);
}

// Persist
const persistConfig = {
  whitelist: ['account'],
}
persistStore(store, persistConfig);
getStoredState(persistConfig, (err, state) => {
  if (state.account) {
    if (state.account.currentUser) {
      if (window.signedIn) {
        const user = state.account.currentUser;
        store.dispatch(updateCurrentUser(user));
        window.accountChannel.push('set_current_user', user);
      }
    }
  }
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Application}>
        <Route path="account" component={Account}>
          <Route path="users" component={UserList} />
          <Route path="threads" component={AccountThreads} />
          <Route path="groups" component={AccountGroups} />
          <Route path="watchlists" component={AccountWatchlists} />
          <Route path="add-user" component={AddUser} />
          <Route path="add-thread" component={AddThread} />
          <Route path="add-group" component={AddGroup} />
          <Route path="add-watchlist" component={AddWatchlist} />
          <Route path="notifications" component={Unimplemented} />
        </Route>
        <Route path="threads" component={ThreadPage}>
          <IndexRoute component={ThreadAll}/>
          <Route path=":id" component={Thread} />
        </Route>
        <Route path="watchlists" component={WatchlistPage}>
          <Route path=":id" component={Watchlist} />
        </Route>
        <Route path="groups" component={GroupPage}>
          <IndexRoute component={GroupAll}/>
          <Route path=":id" component={Group}>
            <IndexRoute component={GroupThreads} onEnter={() =>
              store.dispatch(switchGroupPageTabs('threads'))} />
            <Route path="threads" component={GroupThreads} onEnter={() =>
              store.dispatch(switchGroupPageTabs('threads'))} />
            <Route path="groups" component={GroupGroups} onEnter={() =>
              store.dispatch(switchGroupPageTabs('groups'))} />
            <Route path="members" component={GroupMembers} onEnter={() =>
              store.dispatch(switchGroupPageTabs('members'))} />
          </Route>
        </Route>
        <Route path="posts" component={PostPage}>
          <Route path=":id" component={Post} />
        </Route>
        <Route path="users" component={UserPage}>
          <Route path=":id" component={User} />
        </Route>
        <Route path="signin" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('container')
);
