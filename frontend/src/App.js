import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import './App.css';

const App = () => {
  
  const [notes, setNotes] = useState([
    { id: 1, content: 'Note 1' },
    { id: 2, content: 'Note 2' },
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

  useEffect(() => {
    document.title = `${getGreeting()}, welcome to the note-taking app!`;
  }, []);

  const handleUpdate = (id, newContent) => {
    setNotes(notes.map(note => note.id === id ? { ...note, content: newContent } : note));
  };

  return (
    <div className="App">
      <h1>{getGreeting()}, welcome to the note-taking app!</h1>
      <NoteList notes={notes} handleUpdate={handleUpdate} />
    </div>
  );
};

export default App;
