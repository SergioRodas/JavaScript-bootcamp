import React, { useEffect, useState } from 'react'
import './App.css'
import { Note } from './Note'

export default function App() {
    const [notes, setNotes ] = useState([])
    const [newNote, setNewNote] = useState('')
    const [loading, setLoding] = useState(false)

    useEffect(() => {
      setLoding(true)
      setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => setNotes(json))
        setLoding(false)
      }, 2000)
    }, [])

    const handleChange = (event) => {
      setNewNote(event.target.value)
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      const noteToAddToState = {
        id: notes.length + 1,
        title: newNote,
        body: newNote,
      }
      setNotes([...notes, noteToAddToState])
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