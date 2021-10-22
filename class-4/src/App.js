import React, { useState } from 'react'
import './App.css'
import { Note } from './Note'

export default function App(props) {
    const [notes, setNotes ] = useState(props.notes)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)

    const handleChange = (event) => {
      setNewNote(event.target.value)
    }
    
    const handleSubmit = (event) => {
      event.preventDefault()
      const noteToAddToState = {
        id: notes.length + 1,
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5
      }
      setNotes([...notes, noteToAddToState])
      setNewNote('')
    }

    const handleShowAll = () => {
      setShowAll(() => !showAll)
    }

    return (
      <div>
        <h1>Notas</h1>
        <button onClick={handleShowAll}>{showAll ? 'Mostrar solo lo importante' : 'Mostrar todo'}</button>
        <ul>
            {notes
            /* filter should always return a boolean */
            .filter((note) => {
              if (showAll === true) return true
              return note.important === true
            })
            .map(note => <Note key={note.id} id={note.id} content={note.content} date={note.date}/>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={newNote}/>
          {/* by default the last button of a form works as a submit */}
          <button>Crear nota</button>
        </form>
      </div>
    )
}