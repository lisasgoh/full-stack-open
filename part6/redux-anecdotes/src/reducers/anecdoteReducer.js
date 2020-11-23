import anecdoteService from './services/anecdoteService'

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
    return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      anecdote
    })
  }
}
/**
 * it is possible to define action creators so that they return a function having the dispatch-method of redux-store as its parameter. 
 * As a result of this, one can make asynchronous action creators, which first wait for some operation to finish, after which they then dispatch the real action.
 * @param {Array} anecdotes 
 */
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
     }
    case 'NEW_ANECDOTE': {
      return [...state, action.anecdote]
    }
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer