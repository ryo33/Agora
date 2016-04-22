import React from 'react'

const mapStateToProps = (state) => {
    return {
        signed_in: state.signed_in
    }
}

const signed = ({signed_in, children}, value) => {
    if ( signed_in == value ) {
        return <span>{children}</span>
    } else {
        return null
    }
}
const SignedIn = (props) => signed(props, true)

const NotSignedIn = (props) => signed(props, false)

export { SignedIn, NotSignedIn }
