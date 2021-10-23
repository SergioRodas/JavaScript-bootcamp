import React, { useState } from 'react'
import './App.css'
import { Note } from './Note'

export default function App(props) {
    const [notes, setNotes ] = useState(props.notes)
    const [newNote, setNewNote] = useState('')

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
        <ul>
            {notes
            .map(note => <Note key={note.id} {...note}/>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newNote}/>
          {/* by default the last button of a form works as a submit */}
          <button>Crear nota</button>
        </form>
      </div>
    )
}