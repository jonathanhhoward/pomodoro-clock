import React from 'react';
import ClockControl from './ClockControl';

function SessionControl({ state, dispatch }) {
  function handleClick(event) {
    const action = event.target.id;
    dispatch({ type: action });
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
      callback: handleClick,
      disabled: state.startStop === 'STOP' || state.sessionLength === 1,
      text: '-',
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: handleClick,
      disabled: state.startStop === 'STOP' || state.sessionLength === 60,
      text: '+',
    },
  };

  return <ClockControl {...sessionProps} />;
}

export default SessionControl;
