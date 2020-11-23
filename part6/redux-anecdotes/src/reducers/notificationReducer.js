const initialNotification = ""

  export const setNotification = (content) => {
    return {
      type: 'SHOW_NOTIFICATION',
      data: { content }
    }
  }

  export const hideNotification = (content) => {
    return {
      type: 'HIDE_NOTIFICATION',
    }
  }
  
  
  const initialState = initialNotification;
  
  const reducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch(action.type) {
      case 'SHOW_NOTIFICATION': {
        return `you voted "${action.data.content}"`;
       }
       case 'HIDE_NOTIFICATION': {
        return "";
       }
       default:
        return state
    }
  }
  
  export default reducer