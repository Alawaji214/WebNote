import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPassword from './ResetPassword'; // Import the ResetPassword component

import NoteList from './NoteList';
import AuthPage from './AuthPage';
import './App.css';

import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.userId;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};



const App = () => {

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    const userId = getUserIdFromToken(token); // Get the user ID from the token

    try {
      const response = await fetch('https://note-gateway9-2m0hc1vk.uc.gateway.dev/v1/note/note', {
        method: 'GET',
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
      userId: getUserIdFromToken(localStorage.getItem('token')), // use the actual userId from getUserIdFromToken
    };

    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await fetch('https://note-gateway9-2m0hc1vk.uc.gateway.dev/v1/note/note', {
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

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await fetch(`https://note-gateway9-2m0hc1vk.uc.gateway.dev/v1/note/note/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
      });

      if (response.ok) {
        console.log('Note deleted successfully');
        // Update your state here to remove the note from your list
        setNotes(notes.filter(note => note._id !== id));
      } else {
        console.log('Failed to delete note');
      }
    } catch (error) {
      console.error('An error occurred while deleting the note:', error);
    }
  };

  useEffect(() => {
    document.title = `${getGreeting()}, welcome to the note-taking app!`;
  }, []);

  const handleUpdate = async (id, newContent) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from local storage

      const response = await fetch(`https://note-gateway9-2m0hc1vk.uc.gateway.dev/v1/note/note/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (response.ok) {
        console.log('Note updated successfully');
        setNotes(notes.map(note => note._id === id ? { ...note, content: newContent } : note));
      } else {
        console.log('Failed to update note');
      }
    } catch (error) {
      console.error('An error occurred while updating the note:', error);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    fetchNotes();
  };

  const DefaultContent = () => {
    return (
      <div>
        {!isSignedIn && <AuthPage handleSignIn={handleSignIn} />}
        {isSignedIn &&
          <NoteList notes={notes} handleUpdate={handleUpdate} handleCreate={handleCreate} handleDelete={handleDelete} />
        }
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <h1>{getGreeting()}, welcome to the note-taking app!</h1>
        <Routes>
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/" element={<DefaultContent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
