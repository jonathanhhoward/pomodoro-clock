import React, { useEffect } from 'react';
import ClockControl from './ClockControl';
import formatSecondsAsMMSS from '../formatSecondsAsMMSS';

function TimerControl({ state, dispatch, initialState }) {
  useEffect(
    function updateTimerLength() {
      dispatch({
        type: 'timerLength-changed',
        payload:
          state.timerType === 'Session'
            ? state.sessionLength * 60
            : state.breakLength * 60,
      });
    },
    [state.timerType, state.sessionLength, state.breakLength, dispatch]
  );

  useEffect(function switchTimerType() {
    if (state.timerLength !== 0) return;

    dispatch({
      type: 'timer-ended',
      payload:
        state.timerType === 'Session'
          ? state.breakLength * 60
          : state.sessionLength * 60,
    });

    document.getElementById('beep').play();
  });

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
    [state.timerStatus, dispatch]
  );

  function handleStartStopClick({ target }) {
    dispatch({
      type: target.textContent === 'START' ? 'timer-started' : 'timer-stopped',
    });
  }

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
      callback: handleStartStopClick,
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
