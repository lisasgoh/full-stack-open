const initialNotification = ""

  export const setNotification = (content, time) => {
    return async dispatch => {
      await dispatch({
        type: 'SHOW_NOTIFICATION',
        data: { content }
      })
      setTimeout(() => {
        dispatch(hideNotification())
      }, time * 1000)
    }
  }

  export const hideNotification = () => {
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