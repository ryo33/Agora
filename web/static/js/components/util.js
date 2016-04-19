import React from 'react'

const _signed_in = signed_in

const signed = (props, value) => {
    if ( _signed_in == value ) {
        return <span>{props.children}</span>
    } else {
        return <span />
    }
}
const SignedIn = (props) => signed(props, true)

const NotSignedIn = (props) => signed(props, false)

export { SignedIn, NotSignedIn }
