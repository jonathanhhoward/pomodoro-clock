import React from 'react'
import ClockControl from './ClockControl'
import formatSecondsAsMMSS from '../formatSecondsAsMMSS'

function TimerControl ({
  timerLabel,
  timeLeft,
  startStop,
  onClickStartStop,
  onClickReset
}) {
  const timerData = {
    h2: {
      id: 'timer-label',
      class: null,
      text: timerLabel
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(timeLeft)
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: onClickStartStop,
      text: startStop
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: onClickReset,
      text: 'RESET'
    }
  }

  return <ClockControl data={timerData}/>
}

export default TimerControl
