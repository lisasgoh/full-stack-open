import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'; 
import { setNotification } from '../reducers/notificationReducer'; 
import { useSelector, useDispatch } from 'react-redux';

const AnecdoteList = () => {
  /**
   * useSelector receives a function as a parameter. The function either searches for or selects data from the redux-store.
   */
  const anecdotes = useSelector((state) => { 
    var sortedAnecdotes = state.anecdotes.sort((a, b) => b.votes - a.votes)
    return sortedAnecdotes.filter(anecdote => {
      console.log(anecdote);
      return anecdote.content.includes(state.filter)
    })
  })
  /**
   * The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. 
   * This allows all components to make changes to the state of the redux-store.
   */
  const dispatch = useDispatch()

  const vote = async (id, content) => {
    await dispatch(voteAnecdote(id))
    await dispatch(setNotification(content, 5))
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
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </>
      )
}

export default AnecdoteList;