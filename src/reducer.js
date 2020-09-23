function reducer(state, action) {
  if (action.type === 'reset') return action.payload;

  return {
    sessionLength: sessionLengthReducer(state.sessionLength, action),
    breakLength: breakLengthReducer(state.breakLength, action),
    timerLength: timerLengthReducer(state, action),
    timerType: timerTypeReducer(state.timerType, action),
    timerStatus: timerStatusReducer(state.timerStatus, action),
  };
}

function sessionLengthReducer(sessionLength, action) {
  switch (action.type) {
    case 'session-decrement':
      return sessionLength - 1;
    case 'session-increment':
      return sessionLength + 1;
    default:
      return sessionLength;
  }
}

function breakLengthReducer(breakLength, action) {
  switch (action.type) {
    case 'break-decrement':
      return breakLength - 1;
    case 'break-increment':
      return breakLength + 1;
    default:
      return breakLength;
  }
}

function timerLengthReducer(state, action) {
  switch (action.type) {
    case 'update-session':
      return state.sessionLength * 60;
    case 'update-break':
      return state.breakLength * 60;
    case 'toggle-timerType':
      return action.payload;
    case 'countdown':
      return state.timerLength - 1;
    default:
      return state.timerLength;
  }
}

function timerTypeReducer(timerType, action) {
  switch (action.type) {
    case 'toggle-timerType':
      return timerType === 'Session' ? 'Break' : 'Session';
    default:
      return timerType;
  }
}

function timerStatusReducer(timerStatus, action) {
  switch (action.type) {
    case 'toggle-timerStatus':
      return timerStatus === 'STOPPED' ? 'STARTED' : 'STOPPED';
    default:
      return timerStatus;
  }
}

export default reducer;
