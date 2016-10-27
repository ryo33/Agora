import { blueGrey200, grey100 } from 'material-ui/styles/colors'
import deepAssign from 'deep-assign'

const initialState = {
  resource: {
    root: {
      width: '110px',
      cursor: 'pointer',
    },
    title: {
      padding: '0.25em 0.5em',
    },
    title_text: {
      fontSize: '1em',
      lineHeight: '1em',
    },
    title_icon: {
      fontSize: '1em',
    },
    text: {
      fontSize: '0.6em',
      lineHeight: '1em',
      padding: '0.5em',
    },
    text_icon: {
      fontSize: '0.6em',
    },
  },
  form: {
    box: {
      root: {
        width: '110px',
        cursor: 'pointer',
      },
      icon: {
        fontSize: '72px',
      },
      text: {
        fontSize: '14px',
        lineHeight: '1em',
      },
      title: {
        padding: '0.25em',
      },
    },
  },
  user: {
    root: {
      margin: '0.17em 0',
    },
    header: {
      backgroundColor: blueGrey200,
    },
    body: {
      backgroundColor: grey100,
    },
  },
  webhook: {
    root: {
      margin: '0.17em 0',
    },
  },
}

const theme = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_THEME':
      return deepAssign(state, action.theme)
    default:
      return state
  }
}

export default theme
