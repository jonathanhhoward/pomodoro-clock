import React, { useReducer, useEffect } from 'react'
import ClockControl from './ClockControl'
import './App.css'

export default function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 1500,
    startStop: 'Start',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'break-decrement':
        return { ...state, breakLength: state.breakLength - 1 }
      case 'break-increment':
        return { ...state, breakLength: state.breakLength + 1 }
      case 'update-break':
        return { ...state, timeLeft: state.breakLength * 60 }
      case 'session-decrement':
        return { ...state, sessionLength: state.sessionLength - 1 }
      case 'session-increment':
        return { ...state, sessionLength: state.sessionLength + 1 }
      case 'update-session':
        return { ...state, timeLeft: state.sessionLength * 60 }
      case 'toggle-startStop':
        return {
          ...state,
          startStop: state.startStop === 'Start' ? 'Stop' : 'Start',
        }
      case 'countdown':
        return { ...state, timeLeft: state.timeLeft - 1 }
      case 'toggle-break':
        return {
          ...state,
          timerLabel: 'Break',
          timeLeft: state.breakLength * 60,
        }
      case 'toggle-session':
        return {
          ...state,
          timerLabel: 'Session',
          timeLeft: state.sessionLength * 60,
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
    if (state.startStop === 'Stop') {
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
    if (state.startStop === 'Stop') return
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
      text: 'Break Length'
    },
    div: {
      id: 'break-length',
      class: 'value',
      text: state.breakLength
    },
    button1: {
      id: 'break-decrement',
      callback: handleChangeLength,
      text: '-'
    },
    button2: {
      id: 'break-increment',
      callback: handleChangeLength,
      text: '+'
    }
  }

  const sessionData = {
    h2: {
      id: 'session-label',
      text: 'Session Length'
    },
    div: {
      id: 'session-length',
      class: 'value',
      text: state.sessionLength
    },
    button1: {
      id: 'session-decrement',
      callback: handleChangeLength,
      text: '-'
    },
    button2: {
      id: 'session-increment',
      callback: handleChangeLength,
      text: '+'
    }
  }

  const timerData = {
    h2: {
      id: 'timer-label',
      text: state.timerLabel
    },
    div: {
      id: 'time-left',
      class: 'value',
      text: secToMinSec()
    },
    button1: {
      id: 'start_stop',
      callback: handleStartStop,
      text: state.startStop
    },
    button2: {
      id: 'reset',
      callback: handleReset,
      text: 'Reset'
    }
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
