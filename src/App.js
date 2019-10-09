import React, { useState, useEffect } from 'react'
import './App.css'

export default function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 1500,
    startStop: 'Start',
  }

  const [state, setState] = useState(initialState)

  useEffect(() => {
    let timer = null
    if (state.startStop === 'Stop') {
      timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
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
      setState(prev => ({
        ...prev,
        timerLabel: 'Break',
        timeLeft: prev.breakLength * 60,
      }))
    } else {
      setState(prev => ({
        ...prev,
        timerLabel: 'Session',
        timeLeft: prev.sessionLength * 60,
      }))
    }
    document.getElementById('beep').play()
  }, [state.timerLabel, state.timeLeft])

  const handleChangeLength = (event) => {
    if (state.startStop === 'Stop') return
    const isDecrement = event.target.id.includes('decrement')
    const [LIMIT, CHANGE] = isDecrement ? [1, -1] : [60, 1]
    const isBreak = event.target.id.includes('break')
    if (isBreak) {
      if (state.breakLength === LIMIT) return
      setState(prev => ({
        ...prev,
        breakLength: prev.breakLength + CHANGE,
      }))
      if (state.timerLabel === 'Break') {
        setState(prev => ({
          ...prev,
          timeLeft: prev.breakLength * 60,
        }))
      }
    } else {
      if (state.sessionLength === LIMIT) return
      setState(prev => ({
        ...prev,
        sessionLength: prev.sessionLength + CHANGE,
      }))
      if (state.timerLabel === 'Session') {
        setState(prev => ({
          ...prev,
          timeLeft: prev.sessionLength * 60,
        }))
      }
    }
  }

  const handleStartStop = () => {
    setState(prev => ({
      ...prev,
      startStop: prev.startStop === 'Start' ? 'Stop' : 'Start',
    }))
  }

  const handleReset = () => {
    setState(initialState)
    document.getElementById('beep').load()
  }

  const secToMinSec = () => {
    const mm = Math.floor(state.timeLeft / 60)
    const ss = state.timeLeft % 60
    return `${mm < 10 ? '0' + mm : mm}:${ss < 10 ? '0' + ss : ss}`
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
        <div id={'time-left'}>{secToMinSec()}</div>
        <button id={'start_stop'} onClick={handleStartStop}>
          {state.startStop}
        </button>
        <button id={'reset'} onClick={handleReset}>Reset</button>
      </div>
      <audio id={'beep'} src={'beep.mp3'} preload={'auto'}/>
    </div>
  )
}
