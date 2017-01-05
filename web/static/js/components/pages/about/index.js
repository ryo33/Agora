import React from 'react'
import { source } from 'global'

export const About = () => {
  return (
    <div>
      <h2>Source code</h2>
      <a href={source.url}>{source.title}</a>
    </div>
  )
}
