import React from 'react'
import ClockControl from './ClockControl'

function BreakControl({ length, onChange }) {
  const breakData = {
    h2: {
      id: 'break-label',
      class: null,
      text: 'Break Length'
    },
    div: {
      id: 'break-length',
      class: 'length',
      text: length
    },
    button1: {
      id: 'break-decrement',
      class: 'circle',
      callback: onChange,
      text: '-'
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: onChange,
      text: '+'
    }
  }

  return <ClockControl data={breakData}/>
}

export default BreakControl
