function reducer (state, action) {
  switch (action.type) {
    case 'break-decrement':
      return { ...state, breakLength: state.breakLength - 1 }
    case 'break-increment':
      return { ...state, breakLength: state.breakLength + 1 }
    case 'update-break':
      return { ...state, timeLeft: state.breakLength * 60 }
    case 'session-decrement':
      return { ...state, sessionLength: state.sessionLength - 1 }
    case 'session-increment':
      return { ...state, sessionLength: state.sessionLength + 1 }
    case 'update-session':
      return { ...state, timeLeft: state.sessionLength * 60 }
    case 'toggle-startStop':
      return { ...state, startStop: state.startStop === 'START' ? 'STOP' : 'START' }
    case 'countdown':
      return { ...state, timeLeft: state.timeLeft - 1 }
    case 'toggle-break':
      return {
        ...state,
        timerLabel: 'Break',
        timeLeft: state.breakLength * 60
      }
    case 'toggle-session':
      return {
        ...state,
        timerLabel: 'Session',
        timeLeft: state.sessionLength * 60
      }
    case 'reset':
      return action.payload
    default:
      return state
  }
}

export default reducer
