import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0));
  const [maxValueIndex, setMaxValue] = useState(0);

  const generateAnecdote = () => {
    const index = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(index);
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    const maxValueIndex = copy.indexOf(Math.max.apply(null, copy));
    setMaxValue(maxValueIndex);
  }

  return (
    <div>
      <h1>Anecdote Of The Day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={points[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={generateAnecdote}>next anecdote</button>
      <h1>Anecdote With Most Votes</h1>
      <Anecdote anecdote={props.anecdotes[maxValueIndex]} votes={points[maxValueIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)