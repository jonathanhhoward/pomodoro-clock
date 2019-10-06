import React, { useState, useEffect } from 'react'
import './App.css'

export default function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 1500,
    startStop: 'Start',
    isTimerRunning: false,
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    let timer = null
    if (state.startStop === 'Stop') {
      timer = setInterval(() => {
        setState(state => ({
          ...state,
          timeLeft: state.timeLeft - 1,
        }))
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [state.startStop])

  useEffect(() => {
    if (state.timeLeft !== 0) return
    if (state.timerLabel === 'Session') {
      setState(state => ({
        ...state,
        timerLabel: 'Break',
        timeLeft: state.breakLength * 60,
      }))
    } else {
      setState(state => ({
        ...state,
        timerLabel: 'Session',
        timeLeft: state.sessionLength * 60,
      }))
    }
    /**
     * Todo: Play alarm
     */
  }, [state.timerLabel, state.timeLeft])

  const handleDecrement = (event) => {
    if (state.isTimerRunning) return
    const type = event.target.id.match(/break|session/)[0]
    if (type === 'break') {
      if (state.breakLength === 1) return
      setState(state => ({
        ...state,
        breakLength: state.breakLength - 1,
      }))
      if (state.timerLabel === 'Break') {
        setState(state => ({
          ...state,
          timeLeft: state.breakLength * 60,
        }))
      }
    } else {
      if (state.sessionLength === 1) return
      setState(state => ({
        ...state,
        sessionLength: state.sessionLength - 1,
      }))
      if (state.timerLabel === 'Session') {
        setState(state => ({
          ...state,
          timeLeft: state.sessionLength * 60,
        }))
      }
    }
  }

  const handleIncrement = (event) => {
    if (state.isTimerRunning) return
    const type = event.target.id.match(/break|session/)[0]
    if (type === 'break') {
      if (state.breakLength === 60) return
      setState(state => ({
        ...state,
        breakLength: state.breakLength + 1,
      }))
      if (state.timerLabel === 'Break') {
        setState(state => ({
          ...state,
          timeLeft: state.breakLength * 60,
        }))
      }
    } else {
      if (state.sessionLength === 60) return
      setState(state => ({
        ...state,
        sessionLength: state.sessionLength + 1,
      }))
      if (state.timerLabel === 'Session') {
        setState(state => ({
          ...state,
          timeLeft: state.sessionLength * 60,
        }))
      }
    }
  }

  const handleStartStop = () => {
    setState(state => ({
      ...state,
      startStop: state.startStop === 'Start' ? 'Stop' : 'Start',
      isTimerRunning: !state.isTimerRunning,
    }))
  }

  const handleReset = () => {
    setState(initialState)
    /**
     * Todo: Stop alarm
     */
  }

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2 id={'break-label'}>Break Length</h2>
        <div id={'break-length'}>{state.breakLength}</div>
        <button id={'break-decrement'} onClick={handleDecrement}>-</button>
        <button id={'break-increment'} onClick={handleIncrement}>+</button>
      </div>
      <div>
        <h2 id={'session-label'}>Session Length</h2>
        <div id={'session-length'}>{state.sessionLength}</div>
        <button id={'session-decrement'} onClick={handleDecrement}>-</button>
        <button id={'session-increment'} onClick={handleIncrement}>+</button>
      </div>
      <div>
        <h2 id={'timer-label'}>{state.timerLabel}</h2>
        <div id={'time-left'}>{format_mmss(state.timeLeft)}</div>
        <button id={'start_stop'} onClick={handleStartStop}>
          {state.startStop}
        </button>
        <button id={'reset'} onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

function format_mmss (seconds) {
  const mm = Math.floor(seconds / 60)
  const ss = seconds % 60
  return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`
}
