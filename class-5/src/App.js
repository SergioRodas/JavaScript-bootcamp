import React, { useEffect, useState } from 'react'
import './App.css'
import { Note } from './Note'
import axios from 'axios'

export default function App() {
    const [notes, setNotes ] = useState([])
    const [newNote, setNewNote] = useState('')
    const [loading, setLoding] = useState(false)

    useEffect(() => {
      setLoding(true)
        axios
          .get('https://jsonplaceholder.typicode.com/posts')
          .then((response) => {
          const { data } = response
          setNotes(data)
          setLoding(false)
        })
     }, [])

    const handleChange = (event) => {
      setNewNote(event.target.value)
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      
      const noteToAddToState = {
        title: newNote,
        body: newNote,
        userId: 1
      }

      axios
        .post('https://jsonplaceholder.typicode.com/posts', noteToAddToState)
        .then((response) => {
           const {data} = response
           setNotes(prevNotes => prevNotes.concat(data))
        })
      // setNotes([...notes, noteToAddToState])
      setNewNote('')
    }


    return (
      <div>
        <h1>Notas</h1>
        {
          loading ? 'Cargando...' : "" 
        }
        <ol>
            {notes
            .map(note => <Note key={note.id} {...note}/>)}
        </ol>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newNote}/>
          {/* by default the last button of a form works as a submit */}
          <button>Crear nota</button>
        </form>
      </div>
    )
}