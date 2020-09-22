import React from 'react';
import ClockControl from './ClockControl';

function BreakControl({ state, dispatch }) {
  const breakProps = {
    h2: {
      id: 'break-label',
      class: null,
      text: 'Break Length',
    },
    div: {
      id: 'break-length',
      class: 'length',
      text: state.breakLength,
    },
    button1: {
      id: 'break-decrement',
      class: 'circle',
      callback: () => dispatch({ type: 'break-decrement' }),
      disabled: state.timerStatus === 'STARTED' || state.breakLength === 1,
      text: '-',
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: () => dispatch({ type: 'break-increment' }),
      disabled: state.timerStatus === 'STARTED' || state.breakLength === 60,
      text: '+',
    },
  };

  return <ClockControl {...breakProps} />;
}

export default BreakControl;
