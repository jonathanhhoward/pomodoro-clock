import React from 'react'
import ClockControl from './ClockControl'

function BreakControl ({ breakLength, onChangeBreak }) {
  const breakData = {
    h2: {
      id: 'break-label',
      class: null,
      text: 'Break Length'
    },
    div: {
      id: 'break-length',
      class: 'length',
      text: breakLength
    },
    button1: {
      id: 'break-decrement',
      class: 'circle',
      callback: onChangeBreak,
      text: '-'
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: onChangeBreak,
      text: '+'
    }
  }

  return <ClockControl data={breakData}/>
}

export default BreakControl
