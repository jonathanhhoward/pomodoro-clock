import React from 'react';
import ClockControl from './ClockControl';

function SessionControl({ state, dispatch }) {
  function handleSessionChange(event) {
    if (state.startStop === 'STOP') return;

    const action = event.target.id;
    const LIMIT = action.includes('decrement') ? 1 : 60;
    if (state.sessionLength === LIMIT) return;

    dispatch({ type: action });
    if (state.timerLabel === 'Session') dispatch({ type: 'update-session' });
  }

  const sessionProps = {
    h2: {
      id: 'session-label',
      class: null,
      text: 'Session Length',
    },
    div: {
      id: 'session-length',
      class: 'length',
      text: state.sessionLength,
    },
    button1: {
      id: 'session-decrement',
      class: 'circle',
      callback: handleSessionChange,
      text: '-',
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: handleSessionChange,
      text: '+',
    },
  };

  return <ClockControl {...sessionProps} />;
}

export default SessionControl;
