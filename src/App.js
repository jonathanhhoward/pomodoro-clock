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
    const beep = document.getElementById('beep')
    beep.play()
  }, [state.timerLabel, state.timeLeft])

  const handleChangeLength = (event) => {
    if (state.isTimerRunning) return
    const isDecrement = /decrement/.test(event.target.id)
    const isBreak = /break/.test(event.target.id)
    const timeToBeChanged = isBreak ? breakLength : sessionLength;
    const [LIMIT, CHANGE] = isDecrement ? [1, timeToBeChanged - 1] : [60, timeToBeChanged + 1]
    
    if (isBreak) {
      if (breakLength === LIMIT) return
      setBreakLength(CHANGE)
      if (timerLabel === 'Break') setTimeLeft(breakLength * 60)
    } else {
      if (sessionLength === LIMIT) return
      setSessionLength(CHANGE)
      if (timerLabel === 'Session') setTimeLeft(CHANGE * 60)
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
    const beep = document.getElementById('beep')
    beep.load()
  }

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2 id={'break-label'}>Break Length</h2>
        <div id={'break-length'}>{state.breakLength}</div>
        <button id={'break-decrement'} onClick={handleChangeLength}>-</button>
        <button id={'break-increment'} onClick={handleChangeLength}>+</button>
      </div>
      <div>
        <h2 id={'session-label'}>Session Length</h2>
        <div id={'session-length'}>{state.sessionLength}</div>
        <button id={'session-decrement'} onClick={handleChangeLength}>-</button>
        <button id={'session-increment'} onClick={handleChangeLength}>+</button>
      </div>
      <div>
        <h2 id={'timer-label'}>{state.timerLabel}</h2>
        <div id={'time-left'}>{format_mmss(state.timeLeft)}</div>
        <button id={'start_stop'} onClick={handleStartStop}>
          {state.startStop}
        </button>
        <button id={'reset'} onClick={handleReset}>Reset</button>
      </div>
      <audio id={'beep'} src={'beep.mp3'} preload={'auto'}/>
    </div>
  )
}

function format_mmss (seconds) {
  const mm = Math.floor(seconds / 60)
  const ss = seconds % 60
  return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`
}
