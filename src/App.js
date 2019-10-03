import React, {useState} from 'react'
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
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2>Break Length</h2>
        <div>{state.breakLength}</div>
        <button>-</button>
        <button>+</button>
      </div>
      <div>
        <h2>Session Length</h2>
        <div>{state.sessionLength}</div>
        <button>-</button>
        <button>+</button>
      </div>
      <div>
        <h2>{state.timerLabel}</h2>
        <div>{state.timerLength}</div>
        <button>{state.timerButton}</button>
        <button>Reset</button>
      </div>
    </div>
  )
}
