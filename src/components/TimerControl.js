import React from 'react'
import ClockControl from './ClockControl'
import formatSecondsAsMMSS from '../formatSecondsAsMMSS'

function TimerControl (props) {
  const timerData = {
    h2: {
      id: 'timer-label',
      class: null,
      text: props.timerLabel
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(props.timeLeft)
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: props.onClickStartStop,
      text: props.startStop
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: props.onClickReset,
      text: 'RESET'
    }
  }

  return <ClockControl data={timerData}/>
}

export default TimerControl
