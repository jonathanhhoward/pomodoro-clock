import React, { useEffect } from 'react';
import ClockControl from './ClockControl';
import formatSecondsAsMMSS from '../formatSecondsAsMMSS';

function TimerControl({ state, dispatch, initialState }) {
  useEffect(
    function updateSessionTimer() {
      if (state.timerType === 'Session') dispatch({ type: 'update-session' });
    },
    [state.sessionLength]
  );

  useEffect(
    function updateBreakTimer() {
      if (state.timerType === 'Break') dispatch({ type: 'update-break' });
    },
    [state.breakLength]
  );

  useEffect(
    function startStopTimer() {
      let timer = null;

      if (state.timerStatus === 'STARTED') {
        timer = setInterval(() => {
          dispatch({ type: 'countdown' });
        }, 1000);
      } else {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    },
    [state.timerStatus]
  );

  useEffect(
    function toggleTimer() {
      if (state.timerLength !== 0) return;

      if (state.timerType === 'Session') {
        dispatch({ type: 'toggle-break' });
      } else {
        dispatch({ type: 'toggle-session' });
      }

      document.getElementById('beep').play();
    },
    [state.timerLength]
  );

  function handleResetClick() {
    dispatch({ type: 'reset', payload: initialState });
    document.getElementById('beep').load();
  }

  const timerProps = {
    h2: {
      id: 'timer-label',
      class: null,
      text: state.timerType,
    },
    div: {
      id: 'time-left',
      class: 'time',
      text: formatSecondsAsMMSS(state.timerLength),
    },
    button1: {
      id: 'start_stop',
      class: 'pill',
      callback: () => dispatch({ type: 'toggle-timerStatus' }),
      disabled: false,
      text: state.timerStatus === 'STOPPED' ? 'START' : 'STOP',
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
