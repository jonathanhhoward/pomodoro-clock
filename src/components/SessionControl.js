import React from 'react'
import ClockControl from './ClockControl'

function SessionControl ({ sessionLength, onChangeSession }) {
  const sessionData = {
    h2: {
      id: 'session-label',
      class: null,
      text: 'Session Length'
    },
    div: {
      id: 'session-length',
      class: 'length',
      text: sessionLength
    },
    button1: {
      id: 'session-decrement',
      class: 'circle',
      callback: onChangeSession,
      text: '-'
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: onChangeSession,
      text: '+'
    }
  }

  return <ClockControl data={sessionData}/>
}

export default SessionControl
