function reducer (state, action) {
  if (action.type === 'reset') {
    return action.payload
  }

  return {
    sessionLength: sessionLengthReducer(state.sessionLength, action),
    breakLength: breakLengthReducer(state.breakLength, action),
    timerLabel: timerLabelReducer(state.timerLabel, action),
    startStop: startStopReducer(state.startStop, action),
    timeLeft: timeLeftReducer(state, action)
  }
}

function sessionLengthReducer (sessionLength, action) {
  switch (action.type) {
    case 'session-decrement':
      return sessionLength - 1
    case 'session-increment':
      return sessionLength + 1
    default:
      return sessionLength
  }
}

function breakLengthReducer (breakLength, action) {
  switch (action.type) {
    case 'break-decrement':
      return breakLength - 1
    case 'break-increment':
      return breakLength + 1
    default:
      return breakLength
  }
}

function timerLabelReducer (timerLabel, action) {
  switch (action.type) {
    case 'toggle-session':
      return 'Session'
    case 'toggle-break':
      return 'Break'
    default:
      return timerLabel
  }
}

function startStopReducer (startStop, action) {
  switch (action.type) {
    case 'toggle-startStop':
      return (startStop === 'START') ? 'STOP' : 'START'
    default:
      return startStop
  }
}

function timeLeftReducer (state, action) {
  switch (action.type) {
    case 'update-session':
    case 'toggle-session':
      return state.sessionLength * 60
    case 'update-break':
    case 'toggle-break':
      return state.breakLength * 60
    case 'countdown':
      return state.timeLeft - 1
    default:
      return state.timeLeft
  }
}

export default reducer
