function reducer(state, action) {
  if (action.type === 'reset') return action.payload;

  return {
    sessionLength: sessionLengthReducer(state.sessionLength, action),
    breakLength: breakLengthReducer(state.breakLength, action),
    timerLength: timerLengthReducer(state.timerLength, action),
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

function timerLengthReducer(timerLength, action) {
  switch (action.type) {
    case 'update-timerLength':
    case 'toggle-timerType':
      return action.payload;
    case 'countdown':
      return timerLength - 1;
    default:
      return timerLength;
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
