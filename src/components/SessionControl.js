import React from 'react'
import ClockControl from './ClockControl'

function SessionControl({length, onChange}) {
  const sessionData = {
    h2: {
      id: 'session-label',
      class: null,
      text: 'Session Length'
    },
    div: {
      id: 'session-length',
      class: 'length',
      text: length
    },
    button1: {
      id: 'session-decrement',
      class: 'circle',
      callback: onChange,
      text: '-'
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: onChange,
      text: '+'
    }
  }

  return <ClockControl data={sessionData}/>
}

export default SessionControl
