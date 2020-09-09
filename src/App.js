import React, { useEffect, useReducer } from 'react'
import ClockControl from './ClockControl'
import reducer from './reducer'
import beepSound from './beep.mp3'
import './App.scss'

export default function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 25 * 60,
    startStop: 'START',
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let timer = null
    if (state.startStop === 'STOP') {
      timer = setInterval(() => {
        dispatch({ type: 'countdown' })
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [state.startStop])

  useEffect(() => {
    if (state.timeLeft !== 0) return
    if (state.timerLabel === 'Session') {
      dispatch({ type: 'toggle-break' })
    } else {
      dispatch({ type: 'toggle-session' })
    }
    document.getElementById('beep').play()
  }, [state.timerLabel, state.timeLeft])

  const handleChangeLength = (event) => {
    if (state.startStop === 'STOP') return
    const action = event.target.id
    const LIMIT = action.includes('decrement') ? 1 : 60
    if (action.includes('break')) {
      if (state.breakLength === LIMIT) return
      dispatch({ type: action })
      if (state.timerLabel === 'Break') {
        dispatch({ type: 'update-break' })
      }
    } else {
      if (state.sessionLength === LIMIT) return
      dispatch({ type: action })
      if (state.timerLabel === 'Session') {
        dispatch({ type: 'update-session' })
      }
    }
  }

  const handleStartStop = () => {
    dispatch({ type: 'toggle-startStop' })
  }

  const handleReset = () => {
    dispatch({ type: 'reset', payload: initialState })
    document.getElementById('beep').load()
  }

  const secToMinSec = () => {
    const mm = Math.floor(state.timeLeft / 60)
    const ss = state.timeLeft % 60
    return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`
  }

  const breakData = {
    h2: {
      id: 'break-label',
      class: null,
      text: 'Break Length',
    },
    div: {
      id: 'break-length',
      class: 'length',
      text: state.breakLength,
    },
    button1: {
      id: 'break-decrement',
      class: 'circle',
      callback: handleChangeLength,
      text: '-',
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: handleChangeLength,
      text: '+',
    },
  }

  const sessionData = {
    h2: {
      id: 'session-label',
      class: null,
      text: 'Session Length',
    },
    div: {
      id: 'session-length',
      class: 'length',
      text: state.sessionLength,
    },
    button1: {
      id: 'session-decrement',
      class: 'circle',
      callback: handleChangeLength,
      text: '-',
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: handleChangeLength,
      text: '+',
    },
  }

  const timerData = {
    h2: {
      id: 'timer-label',
      class: null,
      text: state.timerLabel,
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: secToMinSec(),
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: handleStartStop,
      text: state.startStop,
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: handleReset,
      text: 'RESET',
    },
  }

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="flexbox">
        <ClockControl data={breakData}/>
        <ClockControl data={sessionData}/>
      </div>
      <ClockControl data={timerData}/>
      <audio id="beep" src={beepSound} preload="auto"/>
    </div>
  )
}
