import React, { useState } from 'react';

const Note = ({ note, handleUpdate, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(note.content);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(note._id, newContent);
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p onClick={() => setIsEditing(true)}>{note.content}</p>
        
      )}
      <button className="delete-button" onClick={() => handleDelete(note._id)}>x</button>
    </div>
    
  );
};

export default Note;