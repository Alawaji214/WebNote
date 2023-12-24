import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  
  const [notes, setNotes] = useState([
    { id: uuidv4(), content: 'Note 1' },
    { id: uuidv4(), content: 'Note 2' },
  ]);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning!';
    } else if (currentHour < 18) {
      return 'Good afternoon!';
    } else {
      return 'Good evening!';
    }
  };

  const handleCreate = () => {
    const newNote = {
      id: uuidv4(), // generate a new id
      content: 'Temp', // start with an empty content
    };
    setNotes([newNote, ...notes]); // add the new note at the start of the list
  };

  const handleDelete = (id) => {
    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  useEffect(() => {
    document.title = `${getGreeting()}, welcome to the note-taking app!`;
  }, []);

  const handleUpdate = (id, newContent) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content: newContent } : note));
  };

  return (
    <div className="App">
      <h1>{getGreeting()}, welcome to the note-taking app!</h1>
      <NoteList notes={notes} handleUpdate={handleUpdate} handleCreate={handleCreate} handleDelete={handleDelete}/>
    </div>
  );
};

export default App;
