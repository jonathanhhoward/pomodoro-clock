import React, { useEffect } from 'react';
import ClockControl from './ClockControl';
import formatSecondsAsMMSS from '../formatSecondsAsMMSS';

function TimerControl({ state, dispatch, initialState }) {
  useEffect(
    function updateSessionTimer() {
      if (state.activeTimer === 'Session') dispatch({ type: 'update-session' });
    },
    [state.sessionLength]
  );

  useEffect(
    function updateBreakTimer() {
      if (state.activeTimer === 'Break') dispatch({ type: 'update-break' });
    },
    [state.breakLength]
  );

  useEffect(
    function startStopTimer() {
      let timer = null;

      if (state.startStop === 'STOP') {
        timer = setInterval(() => {
          dispatch({ type: 'countdown' });
        }, 1000);
      } else {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    },
    [state.startStop]
  );

  useEffect(
    function toggleTimer() {
      if (state.timeLeft !== 0) return;

      if (state.activeTimer === 'Session') {
        dispatch({ type: 'toggle-break' });
      } else {
        dispatch({ type: 'toggle-session' });
      }

      document.getElementById('beep').play();
    },
    [state.activeTimer, state.timeLeft]
  );

  function handleStartStopClick() {
    dispatch({ type: 'toggle-startStop' });
  }

  function handleResetClick() {
    dispatch({ type: 'reset', payload: initialState });
    document.getElementById('beep').load();
  }

  const timerProps = {
    h2: {
      id: 'timer-label',
      class: null,
      text: state.activeTimer,
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(state.timeLeft),
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: handleStartStopClick,
      disabled: false,
      text: state.startStop,
    },
    button2: {
      id: 'reset',
      class: 'pill',
      callback: handleResetClick,
      disabled: false,
      text: 'RESET',
    },
  };

  return <ClockControl {...timerProps} />;
}

export default TimerControl;
