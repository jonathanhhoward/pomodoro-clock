import React from 'react';
import ClockControl from './ClockControl';

function BreakControl({ state, dispatch }) {
  function handleChangeBreak(event) {
    if (state.startStop === 'STOP') return;

    const action = event.target.id;
    const LIMIT = action.includes('decrement') ? 1 : 60;
    if (state.breakLength === LIMIT) return;

    dispatch({ type: action });
    if (state.timerLabel === 'Break') dispatch({ type: 'update-break' });
  }

  const breakData = {
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
      callback: handleChangeBreak,
      text: '-',
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: handleChangeBreak,
      text: '+',
    },
  };

  return <ClockControl data={breakData} />;
}

export default BreakControl;
