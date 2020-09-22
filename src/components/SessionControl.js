import React from 'react';
import ClockControl from './ClockControl';

function SessionControl({ state, dispatch }) {
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
      callback: () => dispatch({ type: 'session-decrement' }),
      disabled: state.timerStatus === 'STARTED' || state.sessionLength === 1,
      text: '-',
    },
    button2: {
      id: 'session-increment',
      class: 'circle',
      callback: () => dispatch({ type: 'session-increment' }),
      disabled: state.timerStatus === 'STARTED' || state.sessionLength === 60,
      text: '+',
    },
  };

  return <ClockControl {...sessionProps} />;
}

export default SessionControl;
