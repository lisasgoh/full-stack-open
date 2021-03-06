import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer' 
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  /**
   * The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
   * This allows all components to make changes to the state of the redux-store.
   */
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit= { addAnecdote }>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm