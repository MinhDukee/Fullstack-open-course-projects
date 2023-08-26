import { useState } from 'react'

export default function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  let a = new Array(anecdotes.length); for (let i=0; i<anecdotes.length; ++i) a[i] = 0;
  const [Votes, setVotes] = useState(a);
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

  function handleIncrementClick(index) {
    const nextVotes = Votes.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setVotes(nextVotes);
  }
  

  return (
    <div>
      <h1>Anecdote of the day </h1>
      <p> {anecdotes[selected]} </p>
      <p> has {Votes[selected]} votes</p>
      <button onClick={() => setSelected(getRandomInt(anecdotes.length))}>
          Next anecdote
      </button>
      <button onClick={() => {handleIncrementClick(selected);}}>
          Vote
      </button>
      <h1>Anecdote with the most votes</h1>
      <p> {anecdotes[Votes.indexOf(Math.max(...Votes))]} </p>
      <p> has {Math.max(...Votes)} votes.</p>
    </div>
  )
}
