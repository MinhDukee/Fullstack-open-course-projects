import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'
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
    {persons.name}, {persons.number}, <button onClick={() => props.del(persons.id, persons.name)}>{"delete"}</button>
    </li>
  )}</ul>
    </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  


  useEffect(() => {
  personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.find(({name}) => name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      personsService
      .create(personObject)
      .then(returnedPersons => {
        setPersons(persons.concat(returnedPersons))
        setNewNumber("")
        setNewName("")

    })
    }
  }

  const del = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
      .del(id)
      .then(  personsService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        }))
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
      <Numbers toShow = {personsToShow} del = {del}/>

    </div>
  )
}

export default Ap