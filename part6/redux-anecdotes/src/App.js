import React from 'react'
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer' 
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  /**
   * useSelector receives a function as a parameter. The function either searches for or selects data from the redux-store.
   */
  const anecdotes = useSelector(state => state)
  /**
   * The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
   * This allows all components to make changes to the state of the redux-store.
   */
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit= { addAnecdote }>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App