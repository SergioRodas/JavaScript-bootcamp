import React, { useEffect, useState } from 'react'
import './App.css'
import { Note } from './Note'
import { getAllNotes } from './services/notes/getAllNotes'
import { createNote } from './services/notes/createNote'

export default function App() {
    const [notes, setNotes ] = useState([])
    const [newNote, setNewNote] = useState('')
    const [loading, setLoding] = useState(false)

    useEffect(() => {
      setLoding(true)
      getAllNotes()
        .then((notes) => {
          setNotes(notes)
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

      createNote(noteToAddToState)
        .then(newNote => {
          setNotes(prevNotes => prevNotes.concat(newNote))
        })

      // setNotes([...notes, noteToAddToState])
      setNewNote('')
    }


    return (
      <div>
        <h1 className="title">Notas</h1>
        {
          loading ? 'Cargando...' : "" 
        }
        {notes ?
          <ul>
              {notes
              .map(note => <Note key={note.id} {...note}/>)}
          </ul>
        : <p className="error-loading-notes">No hay notas disponibles</p>
        }
        <form onSubmit={handleSubmit} className="create-note-form">
          <input type="text" onChange={handleChange} value={newNote}/>
          {/* by default the last button of a form works as a submit */}
          <button>Crear nota</button>
        </form>
      </div>
    )
}