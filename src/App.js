import React, { useState, useEffect } from 'react'
import './App.css'

export default function App () {
  const initial = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 1500,
    startStop: 'Start',
    isRunning: false,
  }

  const [breakLength, setBreakLength] = useState(initial.breakLength)
  const [sessionLength, setSessionLength] = useState(initial.sessionLength)
  const [timerLabel, setTimerLabel] = useState(initial.timerLabel)
  const [timeLeft, setTimeLeft] = useState(initial.timeLeft)
  const [startStop, setStartStop] = useState(initial.startStop)
  const [isRunning, setIsRunning] = useState(initial.isRunning)

  useEffect(() => {
    let timer = null
    if (startStop === 'Stop') {
      timer = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1)
      }, 1000)
    } else {
      clearInterval(timer)
    }
    return () => clearInterval(timer)
  }, [startStop])

  useEffect(() => {
    if (timeLeft !== 0) return
    if (timerLabel === 'Session') {
      setTimerLabel('Break')
      setTimeLeft(breakLength * 60)
    } else {
      setTimerLabel('Session')
      setTimeLeft(sessionLength * 60)
    }
    const beep = document.getElementById('beep')
    beep.play()
  }, [breakLength, sessionLength, timerLabel, timeLeft])

  const handleChangeLength = (event) => {
    if (isRunning) return
    const isDecrement = /decrement/.test(event.target.id)
    const [LIMIT, CHANGE] = isDecrement ? [1, -1] : [60, 1]
    const isBreak = /break/.test(event.target.id)
    if (isBreak) {
      if (breakLength === LIMIT) return
      setBreakLength(breakLength => breakLength + CHANGE)
      if (timerLabel === 'Break') setTimeLeft(breakLength * 60)
    } else {
      if (sessionLength === LIMIT) return
      setSessionLength(sessionLength => sessionLength + CHANGE)
      if (timerLabel === 'Session') setTimeLeft(sessionLength * 60)
    }
  }

  const handleStartStop = () => {
    setStartStop(startStop => startStop === 'Start' ? 'Stop' : 'Start')
    setIsRunning(isRunning => !isRunning)
  }

  const handleReset = () => {
    setBreakLength(initial.breakLength)
    setSessionLength(initial.sessionLength)
    setTimerLabel(initial.timerLabel)
    setTimeLeft(initial.timeLeft)
    setStartStop(initial.startStop)
    setIsRunning(initial.isRunning)
    const beep = document.getElementById('beep')
    beep.load()
  }

  return (
    <div>
      <h1>Pomodoro Clock</h1>
      <div>
        <h2 id={'break-label'}>Break Length</h2>
        <div id={'break-length'}>{breakLength}</div>
        <button id={'break-decrement'} onClick={handleChangeLength}>-</button>
        <button id={'break-increment'} onClick={handleChangeLength}>+</button>
      </div>
      <div>
        <h2 id={'session-label'}>Session Length</h2>
        <div id={'session-length'}>{sessionLength}</div>
        <button id={'session-decrement'} onClick={handleChangeLength}>-</button>
        <button id={'session-increment'} onClick={handleChangeLength}>+</button>
      </div>
      <div>
        <h2 id={'timer-label'}>{timerLabel}</h2>
        <div id={'time-left'}>{format_mmss(timeLeft)}</div>
        <button id={'start_stop'} onClick={handleStartStop}>
          {startStop}
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
