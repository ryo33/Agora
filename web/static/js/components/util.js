import React from 'react'

const signed = ({children}, value) => {
    if ( window.signed_in == value ) {
        return <span>{children}</span>
    } else {
        return null
    }
}

const SignedIn = (props) => signed(props, true)

const NotSignedIn = (props) => signed(props, false)

export { SignedIn, NotSignedIn }
