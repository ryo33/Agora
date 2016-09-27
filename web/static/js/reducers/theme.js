import MaterialColors from 'material-colors';
import deepAssign from 'deep-assign';

const initialState = {
  resource: {
    root: {
      width: "100px",
      cursor: "pointer",
    },
    title: {
      padding: "0.25em 0.5em",
    },
    title_text: {
      fontSize: "14px",
      lineHeight: "1em",
    },
    title_icon: {
        fontSize: "14px",
    },
    text: {
      fontSize: "8px",
      lineHeight: "1em",
      padding: "0.5em 1em",
    },
    text_icon: {
        fontSize: "8px",
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
