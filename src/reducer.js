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
    case 'sessionLength-reduced':
      return sessionLength - 1;
    case 'sessionLength-increased':
      return sessionLength + 1;
    default:
      return sessionLength;
  }
}

function breakLengthReducer(breakLength, action) {
  switch (action.type) {
    case 'breakLength-reduced':
      return breakLength - 1;
    case 'breakLength-increased':
      return breakLength + 1;
    default:
      return breakLength;
  }
}

function timerLengthReducer(timerLength, action) {
  switch (action.type) {
    case 'timerLength-changed':
    case 'timer-ended':
      return action.payload;
    case 'countdown':
      return timerLength - 1;
    default:
      return timerLength;
  }
}

function timerTypeReducer(timerType, action) {
  switch (action.type) {
    case 'timer-ended':
      return timerType === 'Session' ? 'Break' : 'Session';
    default:
      return timerType;
  }
}

function timerStatusReducer(timerStatus, action) {
  switch (action.type) {
    case 'timer-started':
      return 'STARTED';
    case 'timer-stopped':
      return 'STOPPED';
    default:
      return timerStatus;
  }
}

export default reducer;
