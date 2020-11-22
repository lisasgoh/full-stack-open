import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'; 
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
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
    return (
        <>
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
        </>
      )
}

export default AnecdoteList;