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
      fontSize: "18px",
      lineHeight: "1em",
    },
    title_icon: {
      fontSize: "18px",
    },
    text: {
      fontSize: "8px",
      lineHeight: "1em",
      padding: "0.5em",
    },
    text_icon: {
        fontSize: "14px",
    },
  },
  form: {
    box: {
      root: {
        width: "100px",
        cursor: "pointer",
      },
      icon: {
        fontSize: "72px",
      },
      text: {
        fontSize: "14px",
        lineHeight: "1em",
      },
      title: {
        padding: "0.25em",
      },
    },
    dialog: {
      title: {
        padding: "1em",
        fontSize: "14px",
      },
      body: {
        padding: "1em",
        fontSize: "14px",
      },
      button: {
        label: {
          fontSize: "14px",
        },
      },
      textField: {
      },
      userSelecter: {
        root: {
          width: "10em"
        },
        label: {
          fontSize: "14px",
        },
      },
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
