import React, { useState } from 'react'
import './App.css'

export default function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timerLength: '25:00',
    timerButton: 'Start',
  }
  const [state, setState] = useState(initialState)
  const handleDecrement = (event) => {
    switch (event.target.value) {
      case 'break':
        if (state.breakLength === 1) return
        setState(prev => ({
          ...prev,
          breakLength: prev.breakLength - 1
        }))
        break
      case 'session':
        if (state.sessionLength === 1) return
        setState(prev => ({
          ...prev,
          sessionLength: prev.sessionLength - 1
        }))
        break
      default:
    }
  }
  const handleIncrement = (event) => {
    switch (event.target.value) {
      case 'break':
        if (state.breakLength === 60) return
        setState(prev => ({
          ...prev,
          breakLength: prev.breakLength + 1
        }))
        break
      case 'session':
        if (state.sessionLength === 60) return
        setState(prev => ({
          ...prev,
          sessionLength: prev.sessionLength + 1
        }))
        break
      default:
    }
  }
  const handleStartStop = () => {
    setState(prev => ({
      ...prev,
      timerButton: prev.timerButton === 'Start' ? 'Stop' : 'Start',
    }))
    /**
     * Todo: (set/clear)Interval
     */
  }
  const handleReset = () => {
    setState(initialState)
    /**
     * Todo: clearInterval, stop audio
     */
  }
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2>Break Length</h2>
        <div>{state.breakLength}</div>
        <button onClick={handleDecrement} value={'break'}>-</button>
        <button onClick={handleIncrement} value={'break'}>+</button>
      </div>
      <div>
        <h2>Session Length</h2>
        <div>{state.sessionLength}</div>
        <button onClick={handleDecrement} value={'session'}>-</button>
        <button onClick={handleIncrement} value={'session'}>+</button>
      </div>
      <div>
        <h2>{state.timerLabel}</h2>
        <div>{state.timerLength}</div>
        <button onClick={handleStartStop}>{state.timerButton}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
