import React, { useReducer } from 'react';
import BreakControl from './components/BreakControl';
import SessionControl from './components/SessionControl';
import TimerControl from './components/TimerControl';
import reducer from './reducer';
import beepSound from './beep.mp3';
import './App.scss';

function App() {
  const initialState = {
    breakLength: 5,
    sessionLength: 25,
    activeTimer: 'Session',
    timeLeft: 25 * 60,
    startStop: 'START',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="clock">
      <h1>Pomodoro Clock</h1>
      <div className="flexbox">
        <BreakControl state={state} dispatch={dispatch} />
        <SessionControl state={state} dispatch={dispatch} />
      </div>
      <TimerControl
        state={state}
        dispatch={dispatch}
        initialState={initialState}
      />
      <audio id="beep" src={beepSound} preload="auto" />
    </div>
  );
}

export default App;
