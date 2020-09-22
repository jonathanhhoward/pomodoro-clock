import React from 'react';
import ClockControl from './ClockControl';

function BreakControl({ state, dispatch }) {
  function handleClick(event) {
    const action = event.target.id;
    dispatch({ type: action });
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
      callback: handleClick,
      disabled: state.startStop === 'STOP' || state.breakLength === 1,
      text: '-',
    },
    button2: {
      id: 'break-increment',
      class: 'circle',
      callback: handleClick,
      disabled: state.startStop === 'STOP' || state.breakLength === 60,
      text: '+',
    },
  };

  return <ClockControl {...breakProps} />;
}

export default BreakControl;
