const Course = (props) => {
  const course = props.course
  const parts = course.parts
  console.log(parts)
  const initialvalue = 0
  const total = parts.reduce((s, p) => s + p.exercises, initialvalue)
  return (
    <div>
    <h1>{course.name}</h1>
    <ul>
        {parts.map(parts => 
          <li key = {parts.id}>
            {parts.name}  {parts.exercises}
          </li>
        )}
    </ul>
    <p> total of {total} exercises</p>
    </div>
    )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return  <div>
    <ul>{courses.map(courses => 
    <li key = {courses.id} >
      <Course course={courses} />
    </li>
  )}</ul>
  </div>
}

export default App
