import React, { Component } from 'react'
import { grey300, grey50 } from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'

const styles = {
  root: {
    cursor: 'pointer',
  },
}

const ListItem = ({ isOwned, children, handleClick }) => {
  return (
    <div style={styles.root}>
      <Divider
        style={isOwned ? { backgroundColor: grey50 } : null}
      />
      <div
        style={{
          padding: '5px 12px',
          backgroundColor: isOwned ? grey300 : undefined,
          zDepth: 0,
        }}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  )
}

export default ListItem
