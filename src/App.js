import React from 'react'
import './App.css'

export default function App () {
  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2>Break Length</h2>
        <div>5</div>
        <button>-</button>
        <button>+</button>
      </div>
      <div>
        <h2>Session Length</h2>
        <div>25</div>
        <button>-</button>
        <button>+</button>
      </div>
      <div>
        <h2>Session</h2>
        <div>25:00</div>
        <button>Start/Stop</button>
        <button>Reset</button>
      </div>
    </div>
  )
}
