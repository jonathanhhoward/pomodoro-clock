import React from 'react';
import ClockControl from './ClockControl';

function BreakControl({ state, dispatch }) {
  function handleBreakChange(event) {
    if (state.startStop === 'STOP') return;

    const action = event.target.id;
    const LIMIT = action.includes('decrement') ? 1 : 60;
    if (state.breakLength === LIMIT) return;

    dispatch({ type: action });
    if (state.activeTimer === 'Break') dispatch({ type: 'update-break' });
  }

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
      callback: handleBreakChange,
      text: '-',
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: handleBreakChange,
      text: '+',
    },
  };

  return <ClockControl {...breakProps} />;
}

export default BreakControl;
