import React, { useReducer, useEffect } from 'react'
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
      case 'start-stop':
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
    dispatch({ type: 'start-stop' })
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

  return (
    <div className={'Clock'}>
      <h1>Pomodoro Clock</h1>
      <div className={'Container'}>
        <div className={'Break'}>
          <h2 id={'break-label'}>Break Length</h2>
          <div className={'value'} id={'break-length'}>{state.breakLength}</div>
          <button id={'break-decrement'} onClick={handleChangeLength}>-</button>
          <button id={'break-increment'} onClick={handleChangeLength}>+</button>
        </div>
        <div className={'Session'}>
          <h2 id={'session-label'}>Session Length</h2>
          <div className={'value'}
               id={'session-length'}>{state.sessionLength}</div>
          <button id={'session-decrement'} onClick={handleChangeLength}>-
          </button>
          <button id={'session-increment'} onClick={handleChangeLength}>+
          </button>
        </div>
      </div>
      <div className={'Timer'}>
        <h2 id={'timer-label'}>{state.timerLabel}</h2>
        <div className={'value'} id={'time-left'}>{secToMinSec()}</div>
        <button id={'start_stop'} onClick={handleStartStop}>
          {state.startStop}
        </button>
        <button id={'reset'} onClick={handleReset}>Reset</button>
      </div>
      <audio id={'beep'} src={'beep.mp3'} preload={'auto'}/>
    </div>
  )
}
