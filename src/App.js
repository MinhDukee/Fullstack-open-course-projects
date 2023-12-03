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

const Notification = (props) => {
  const message = props.message
  const classname = props.classname
  console.log(classname)
  console.log(message)

  if (message === null) {
    return null
  } 
  
  
  return (
      <div className = {classname} >
        {message}
      </div>
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
  const [message, setNewMessage] = useState(null)
  const [classname, setClassname] = useState(null)
  console.log("Class name's value is " +  classname)
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
      var sameperson = persons.filter(person => person.name === newName);
      var samepersonsid = sameperson[0].id
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one??`)){
        personsService
        .update(samepersonsid, personObject)
        .then(returnedPersons => {
          setClassname(
            `notif`
          )
          setNewMessage(
            `${newName}'s number was changed.`
          )

          console.log(classname)
          setTimeout(() => {
            setNewMessage(null)
            setClassname(null)
          }, 5000)
          setPersons(persons.splice(persons.findIndex(({id}) => id === samepersonsid), 1))
          setPersons(persons.concat(returnedPersons))
          setNewNumber("")
          setNewName("")})
          .catch(error => {
            setClassname(
              `error`
            )
            setNewMessage(
              `Information of ${newName} has already been removed from server.`
            )
            setTimeout(() => {
              setNewMessage(null)
              setClassname(null)
              setNewNumber("")
          setNewName("")
            }, 5000)
            personsService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
          }
          
          )

      } } else {
      personsService
      .create(personObject)
      .then(returnedPersons => {
        setClassname(
          `notif`
        )
        setNewMessage(
          `${newName} was added to the phonebook.`
        )
        setTimeout(() => {
          setNewMessage(null)
          setClassname(null)
        }, 5000)
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
        }
        
        )
        
        )
    }
    setClassname(
      `notif`
    )
    setNewMessage(
      `${name} has been deleted from the phonebook.`
    )
    setTimeout(() => {
      setNewMessage(null)
      setClassname(null)
    }, 5000)
   
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
      <h1>Phonebook</h1>
      <Notification message={message} classname = {classname} />
      <Filter eventhandler = {handleFilterChange} state = {newFilter}/>
      <PersonForm submit = {addPerson} value = {[newName, newNumber]} change = {[handlePersonsChange, handleNumbersChange]} />
      <Numbers toShow = {personsToShow} del = {del}/>

    </div>
  )
}

export default App