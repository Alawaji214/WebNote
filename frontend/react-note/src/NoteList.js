import React from 'react';
import Note from './Note';

const NoteList = ({ notes, handleUpdate }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <Note key={note.id} note={note} handleUpdate={handleUpdate} />
      ))}
    </div>
  );
};

export default NoteList;
