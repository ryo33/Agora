import {
  branch, compose, lifecycle, renderNothing, renderComponent
} from 'recompose';
import { connect } from 'react-redux';

import Loading from 'components/Loading';

import {
  prepareGroups, prepareThreads, preparePosts, prepareUsers, prepareWatchlists, prepareWebhooks
} from 'actions/resources';
import { getAccountUserIDs } from 'selectors/accountPage';

function createRequireResource(resources, resource, prepareResource) {
  return function(component, loadingComponent = Loading) {
    const mapStateToProps = (state, { id }) => {
      const a = state[resources][id] || null;
      return { [resource]: a };
    };
    const onlyLoaded = branch(
      ({ [resource]: required }) => required != null,
      c => c,
      renderComponent(loadingComponent)
    );
    const prepare = lifecycle({
      componentDidMount() {
        const { id, dispatch, [resource]: required } = this.props;
        if (required == null) {
          dispatch(prepareResource([id]))
        }
      }
    });
    return compose(connect(mapStateToProps), prepare, onlyLoaded)(component)
  }
}

export const requireGroup = createRequireResource('groups', 'group', prepareGroups);
export const requireThread = createRequireResource('threads', 'thread', prepareThreads);
export const requirePost = createRequireResource('posts', 'post', preparePosts);
export const requireUser = createRequireResource('users', 'user', prepareUsers);
export const requireWatchlist = createRequireResource('watchlists', 'watchlist', prepareWatchlists);
export const requireWebhook = createRequireResource('webhooks', 'webhook', prepareWebhooks);

export const checkOwned = resource => {
  return component => {
    const mapStateToProps = (state, { id }) => {
      const a = state[resource][id];
      const users = getAccountUserIDs(state);
      return {
        isOwned: a ? users.includes(a.user_id) : false
      }
    };
    return connect(mapStateToProps)(component);
  }
};
export const checkThreadOwned = checkOwned('threads');
export const checkWebhookOwned = checkOwned('webhooks');

export const onlyOwned = branch(
  ({ isOwned }) => isOwned,
  c => c,
  renderNothing
);
