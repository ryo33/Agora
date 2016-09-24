import MaterialColors from 'material-colors';
import deepAssign from 'deep-assign';

const initialState = {
  watchlist: {
    root: {
      margin: "0.17em 0"
    },
    header: {
      backgroundColor: MaterialColors.lime[200]
    },
    body: {
      backgroundColor: MaterialColors.grey[100]
    },
  },
  group: {
    root: {
      margin: "0.17em 0",
      width: "250px",
      height: "200px"
    },
    header: {
      backgroundColor: MaterialColors.purple[200]
    },
    body: {
      backgroundColor: MaterialColors.grey[100]
    },
  },
  thread: {
    root: {
      margin: "0.17em 0",
      width: "250px",
      height: "200px"
    },
    header: {
      backgroundColor: MaterialColors.brown[200],
    },
    body: {
      backgroundColor: MaterialColors.grey[100],
    },
  },
  post: {
    root: {
      margin: '0.17em 0',
    },
    header: {
      backgroundColor: MaterialColors.blueGrey[200],
    },
    body: {
      backgroundColor: MaterialColors.grey[100],
    },
  },
  user: {
    root: {
      margin: "0.17em 0"
    },
    header: {
      backgroundColor: MaterialColors.blueGrey[200]
    },
    body: {
      backgroundColor: MaterialColors.grey[100]
    },
  }
};

const colors = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return deepAssign(state, action.theme);
    default:
      return state;
  }
};

export default colors;
