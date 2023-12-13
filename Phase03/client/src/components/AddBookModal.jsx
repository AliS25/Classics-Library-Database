// AddBookModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';

const AddBookModal = ({ isOpen, onRequestClose, onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');
    const [category, setCategory] = useState('');
    const [availability, setAvailability] = useState('');
    const [additional_notes, setAdditionalNotes] = useState('');
    const [room, setRoom] = useState('');
    const [shelf, setShelf] = useState('');
    const [pname, setPname] = useState('');
    const [fname, setFname] = useState('');
    const [dname, setDname] = useState('');
    const [year, setYear] = useState('');
    const [edition, setEdition] = useState('');
    // const [copy, setCopy] = useState(4000);



   const handleAddBook = async () => {
    // Basic validation: Ensure title, edition, and automatically assigned copy number are provided
    if (!title || !edition) {
      alert('Please enter a title and edition for the book.');
      return;
    }


    try {
        //http://cosc-257-node08.cs.amherst.edu
        const response = await fetch('http://cosc-257-node08.cs.amherst.edu:3000/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            edition,
            category,
            availability,
            additional_notes,
            room,
            shelf,
            pname,
            fname,
            dname,
            year,
            aname: author,
            ename: editor,
            // copy,
          }),
        });
  
        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Error adding book:', errorMessage);
            return;
          }


        

  
        onRequestClose();
      } catch (error) {
        console.error('Error adding book:', error.message);
      }

    
  };




  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Book"
    >
      <h2>Add Book</h2>
      <form className='addBook'>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <label>Editor:</label>
        <input type="text" value={editor} onChange={(e) => setEditor(e.target.value)} />

        <label>Edition:</label>
        <input type="text" value={edition} onChange={(e) => setEdition(e.target.value)} />

        <label>Category:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label>Availability:</label>
        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} />

        <label>Additional Notes:</label>
        <input type="text" value={additional_notes} onChange={(e) => setAdditionalNotes(e.target.value)} />

        <label>Room:</label>
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />

        <label>Shelf:</label>
        <input type="text" value={shelf} onChange={(e) => setShelf(e.target.value)} />

        <label>Publisher Name:</label>
        <input type="text" value={pname} onChange={(e) => setPname(e.target.value)} />

        <label>Faculty Name:</label>
        <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} />

        <label>Donor Name:</label>
        <input type="text" value={dname} onChange={(e) => setDname(e.target.value)} />

        <label>Year:</label>
        <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />

        <button type="button" onClick={handleAddBook}>Add Book</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddBookModal;
