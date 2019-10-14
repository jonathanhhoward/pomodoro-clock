import React, { useReducer, useEffect } from 'react'
import ClockControl from './ClockControl'
import './App.css'

export default function App () {
  const PLUS = '+'
  const MINUS = '-'
  const START = 'START'
  const STOP = 'STOP'
  const RESET = 'RESET'
  const SEC_PER_MIN = 60
  const BREAK_LABEL = 'Break'
  const SESSION_LABEL = 'Session'

  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: SESSION_LABEL,
    timeLeft: 25 * SEC_PER_MIN,
    startStop: START,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'break-decrement':
        return { ...state, breakLength: state.breakLength - 1 }
      case 'break-increment':
        return { ...state, breakLength: state.breakLength + 1 }
      case 'update-break':
        return { ...state, timeLeft: state.breakLength * SEC_PER_MIN }
      case 'session-decrement':
        return { ...state, sessionLength: state.sessionLength - 1 }
      case 'session-increment':
        return { ...state, sessionLength: state.sessionLength + 1 }
      case 'update-session':
        return { ...state, timeLeft: state.sessionLength * SEC_PER_MIN }
      case 'toggle-startStop':
        return {
          ...state,
          startStop: state.startStop === START ? STOP : START,
        }
      case 'countdown':
        return { ...state, timeLeft: state.timeLeft - 1 }
      case 'toggle-break':
        return {
          ...state,
          timerLabel: BREAK_LABEL,
          timeLeft: state.breakLength * SEC_PER_MIN,
        }
      case 'toggle-session':
        return {
          ...state,
          timerLabel: SESSION_LABEL,
          timeLeft: state.sessionLength * SEC_PER_MIN,
        }
      case 'reset':
        return action.payload
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let timer = null
    if (state.startStop === STOP) {
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
    if (state.timerLabel === SESSION_LABEL) {
      dispatch({ type: 'toggle-break' })
    } else {
      dispatch({ type: 'toggle-session' })
    }
    document.getElementById('beep').play()
  }, [state.timerLabel, state.timeLeft])

  const handleChangeLength = (event) => {
    if (state.startStop === STOP) return
    const action = event.target.id
    const LIMIT = action.includes('decrement') ? 1 : 60
    if (action.includes('break')) {
      if (state.breakLength === LIMIT) return
      dispatch({ type: action })
      if (state.timerLabel === BREAK_LABEL) {
        dispatch({ type: 'update-break' })
      }
    } else {
      if (state.sessionLength === LIMIT) return
      dispatch({ type: action })
      if (state.timerLabel === SESSION_LABEL) {
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
    const mm = Math.floor(state.timeLeft / SEC_PER_MIN)
    const ss = state.timeLeft % SEC_PER_MIN
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
      text: MINUS,
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: handleChangeLength,
      text: PLUS,
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
      text: MINUS,
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: handleChangeLength,
      text: PLUS,
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
      text: RESET,

    },
  }

  return (
    <div className={'clock'}>
      <h1>Pomodoro Clock</h1>
      <div className={'flexbox'}>
        <ClockControl data={breakData}/>
        <ClockControl data={sessionData}/>
      </div>
      <ClockControl data={timerData}/>
      <audio id={'beep'} src={'beep.mp3'} preload={'auto'}/>
    </div>
  )
}
