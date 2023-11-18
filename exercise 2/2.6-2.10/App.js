import { useState } from 'react'

const Filter = (props) => {
  return(<div>
    <h2> Filter </h2><div>
      <input value={props.state}
        onChange={props.eventhandler} />
    </div> </div>
  )

}

const PersonForm = (props) => {
  return(<div>
<h2> Add a number </h2>
      <form onSubmit={props.submit}>
        <div>
          name: <input value={props.value[0]} 
          onChange={props.change[0]}/>
        </div>
        <div>number: <input value = {props.value[1]}
        onChange = {props.change[1]}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> </div>
  )

}

const Numbers = (props) =>{
  return(
    <div>
  <h2>Numbers</h2>
  <ul>{props.toShow.map(persons => 
  <li key = {persons.name} >
    {persons.name}, {persons.number}
    </li>
  )}</ul>
    </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState(
    [
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]
  ) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(({name}) => name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handlePersonsChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumbersChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter eventhandler = {handleFilterChange} state = {newFilter}/>
      <PersonForm submit = {addPerson} value = {[newName, newNumber]} change = {[handlePersonsChange, handleNumbersChange]} />
      <Numbers toShow = {personsToShow}/>

    </div>
  )
}

export default App
