import { bindActionCreators } from 'redux';
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
  return function(stateToProps=null, actionCreators=null, keyForID='id') {
    return function(component) {
      const mapStateToProps = (state, ownProps) => {
        const { [keyForID]:id } = ownProps;
        const a = state[resources][id] || null;
        const props = { [resource]: a };
        if (stateToProps != null) {
          return Object.assign(props, stateToProps(state, ownProps));
        } else {
          return props;
        }
      };
      const mapDispatchToProps = dispatch => {
        const props = { dispatch };
        if (actionCreators != null) {
          return Object.assign(props, bindActionCreators(actionCreators, dispatch));
        } else {
          return props;
        }
      };
      const connecter = connect(mapStateToProps, mapDispatchToProps);
      const onlyLoaded = branch(
        ({ [resource]: required }) => required != null,
        c => c,
        renderComponent(Loading)
      );
      const prepare = lifecycle({
        componentDidMount() {
          const { id, dispatch, [resource]: required } = this.props;
          if (required == null) {
            dispatch(prepareResource([id]))
          }
        },
        componentWillReceiveProps(newProps) {
          const { [resource]: required } = this.props;
          const { [resource]: newRequired } = newProps;
          if (required == null && newRequired != null) {
            if (newProps.onLoad) {
              newProps.onLoad();
            }
          }
        }
      });
      return compose(connecter, prepare, onlyLoaded)(component)
    }
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
export const checkGroupOwned = checkOwned('groups');
export const checkPostOwned = checkOwned('posts');
export const checkWebhookOwned = checkOwned('webhooks');
export const checkUserOwned = component => {
  const mapStateToProps = (state, { id }) => {
    const users = getAccountUserIDs(state);
    return { isOwned: users.includes(id) };
  };
  return connect(mapStateToProps)(component);
};

export const onlyOwned = branch(
  ({ isOwned }) => isOwned,
  c => c,
  renderNothing
);
