import React, { useEffect, useReducer } from 'react'
import BreakControl from './components/BreakControl'
import ClockControl from './components/ClockControl'
import reducer from './reducer'
import formatSecondsAsMMSS from './formatSecondsAsMMSS'
import beepSound from './beep.mp3'
import './App.scss'

function App () {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    timerLabel: 'Session',
    timeLeft: 25 * 60,
    startStop: 'START'
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let timer = null
    if (state.startStop === 'STOP') {
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

  function handleChangeBreak (event) {
    if (state.startStop === 'STOP')
      return

    const action = event.target.id
    const LIMIT = action.includes('decrement') ? 1 : 60
    if (state.breakLength === LIMIT)
      return

    dispatch({ type: action })
    if (state.timerLabel === 'Break')
      dispatch({ type: 'update-break' })
  }

  function handleChangeSession (event) {
    if (state.startStop === 'STOP')
      return

    const action = event.target.id
    const LIMIT = action.includes('decrement') ? 1 : 60
    if (state.sessionLength === LIMIT)
      return

    dispatch({ type: action })
    if (state.timerLabel === 'Session')
      dispatch({ type: 'update-session' })
  }

  function handleStartStop () {
    dispatch({ type: 'toggle-startStop' })
  }

  function handleReset () {
    dispatch({ type: 'reset', payload: initialState })
    document.getElementById('beep').load()
  }

  const sessionData = {
    h2: {
      id: 'session-label',
      class: null,
      text: 'Session Length'
    },
    div: {
      id: 'session-length',
      class: 'length',
      text: state.sessionLength
    },
    button1: {
      id: 'session-decrement',
      class: 'circle',
      callback: handleChangeSession,
      text: '-'
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: handleChangeSession,
      text: '+'
    }
  }

  const timerData = {
    h2: {
      id: 'timer-label',
      class: null,
      text: state.timerLabel
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(state.timeLeft)
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: handleStartStop,
      text: state.startStop
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: handleReset,
      text: 'RESET'
    }
  }

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="flexbox">
        <BreakControl
          length={state.breakLength}
          onChange={handleChangeBreak}
        />
        <ClockControl data={sessionData}/>
      </div>
      <ClockControl data={timerData}/>
      <audio id="beep" src={beepSound} preload="auto"/>
    </div>
  )
}

export default App
