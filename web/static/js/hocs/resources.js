import {
  branch, compose, lifecycle, renderNothing, renderComponent
} from 'recompose';

import Loading from 'components/Loading';

import {
  prepareGroups, prepareThreads, preparePosts, prepareUsers
} from 'actions/resources';

function createRequireResource(resource, prepareResource) {
  return function(component, loadingComponent = Loading) {
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
    return compose(prepare, onlyLoaded)(component)
  }
}
export const requireGroup = createRequireResource('group', prepareGroups);
export const requireThread = createRequireResource('thread', prepareThreads);
export const requirePost = createRequireResource('post', preparePosts);
export const requireUser = createRequireResource('user', prepareUsers);
