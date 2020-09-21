import React, { useEffect } from 'react';
import ClockControl from './ClockControl';
import formatSecondsAsMMSS from '../formatSecondsAsMMSS';

function TimerControl({ state, dispatch, initialState }) {
  useEffect(() => {
    let timer = null;

    if (state.startStop === 'STOP') {
      timer = setInterval(() => {
        dispatch({ type: 'countdown' });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [state.startStop]);

  useEffect(() => {
    if (state.timeLeft !== 0) return;

    if (state.timerLabel === 'Session') {
      dispatch({ type: 'toggle-break' });
    } else {
      dispatch({ type: 'toggle-session' });
    }

    document.getElementById('beep').play();
  }, [state.timerLabel, state.timeLeft]);

  function handleStartStop() {
    dispatch({ type: 'toggle-startStop' });
  }

  function handleReset() {
    dispatch({ type: 'reset', payload: initialState });
    document.getElementById('beep').load();
  }

  const timerData = {
    h2: {
      id: 'timer-label',
      class: null,
      text: state.timerLabel,
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(state.timeLeft),
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: handleStartStop,
      text: state.startStop,
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: handleReset,
      text: 'RESET',
    },
  };

  return <ClockControl data={timerData} />;
}

export default TimerControl;
