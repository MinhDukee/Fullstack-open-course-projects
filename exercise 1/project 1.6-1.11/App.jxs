import { useState } from 'react'

export const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const mean = (positive, neutral, negative) => {
  return (positive+(negative*-1))/(neutral+negative+positive)
}

const percentage = (fraction,arr) =>{
  const sum = arr.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  
  return (fraction/(sum))*100}


const StatisticLine = (props) => {

  return <div> <tr> <td> {props.text} </td> <td> {props.value} </td> </tr>  </div>


}

const Statistics = (props) => {

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return(<div> <h1>statistics</h1> <p> No feedback given.</p></div>);
  } else {  return <div> 
    <h1>statistics</h1> 
    <table> 
    <StatisticLine text="good" value = {props.good} />
    <StatisticLine text="neutral" value = {props.neutral} />
    <StatisticLine text="bad" value = {props.bad} />
    <StatisticLine text="all" value = {props.good + props.neutral + props.bad} />
    <StatisticLine text="average" value = {mean(props.good,props.neutral,props.bad)} />
    <StatisticLine text="positive" value = {`${percentage(props.good,[props.good,props.neutral,props.bad])}%`} />
    </table></div>;}

  }

  return (
    <div>
    <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        Good
      </button>
      
            <button onClick={() => setNeutral(neutral + 1)}>
        Neutral
      </button>
      
      <button onClick={() => setBad(bad + 1)}>
        Bad
      </button>

      
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>


    </div>
  )
}

export default App
