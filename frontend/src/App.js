import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import AuthPage from './AuthPage';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

const App = () => {
  
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      try {
        const response = await fetch('http://localhost:4000/v1/note/note', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data); // Set the notes state variable with the fetched data
        } else {
          console.log('Failed to fetch notes');
        }
      } catch (error) {
        console.error('An error occurred while fetching the notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const [isSignedIn, setIsSignedIn] = useState(false); 

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

  const handleCreate = async () => {
    const newNote = {
      content: 'Temp', // start with an empty content
      userId: 'yourUserId', // replace with actual userId
    };
  
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage
  
      const response = await fetch('http://localhost:4000/v1/note/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        const data = await response.json();
        setNotes([data, ...notes]); // add the new note at the start of the list
      } else {
        console.log('Failed to create note');
      }
    } catch (error) {
      console.error('An error occurred while creating the note:', error);
    }
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

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div className="App">
      <h1>{getGreeting()}, welcome to the note-taking app!</h1>
      { !isSignedIn && <AuthPage handleSignIn={handleSignIn} /> }
      { isSignedIn &&
      <NoteList notes={notes} handleUpdate={handleUpdate} handleCreate={handleCreate} handleDelete={handleDelete}/>
      }
    </div>
  );
};

export default App;
