function getGlobal(key, defaultValue = null) {
  if (typeof window !== 'undefined') {
    return window[key]
  } else {
    return defaultValue
  }
}

export const token = getGlobal('token')
export const accountID = getGlobal('accountID')
export const signedIn = getGlobal('signedIn')

export const DEFAULT_TITLE = 'Agoraful'
