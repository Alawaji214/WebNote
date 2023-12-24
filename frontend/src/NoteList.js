import React from 'react';
import Note from './Note';

const NoteList = ({ notes, handleUpdate, handleCreate, handleDelete }) => {
  return (
    <div className="note-list">
      <button className="create-button" onClick={handleCreate}>+</button>
      {notes.map((note) => (
        <Note key={note.id} note={note} handleUpdate={handleUpdate} handleDelete={handleDelete}  />
      ))}
    </div>
  );
};

export default NoteList;
