import React, { useEffect } from 'react';
import ClockControl from './ClockControl';
import formatSecondsAsMMSS from '../formatSecondsAsMMSS';

function TimerControl({ state, dispatch, initialState }) {
  useEffect(
    function updateTimerLength() {
      dispatch({
        type: 'update-timerLength',
        payload:
          state.timerType === 'Session'
            ? state.sessionLength * 60
            : state.breakLength * 60,
      });
    },
    [state.sessionLength, state.breakLength]
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
        dispatch({
          type: 'toggle-timerType',
          payload: state.breakLength * 60,
        });
      } else {
        dispatch({
          type: 'toggle-timerType',
          payload: state.sessionLength * 60,
        });
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
