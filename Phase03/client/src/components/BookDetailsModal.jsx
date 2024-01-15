// BookDetailsModal.js

import React from 'react';
import { useState } from 'react'
import Modal from 'react-modal';
import './BookDetailsModal.css';

Modal.setAppElement('#root');

const BookDetailsModal = ({ isOpen, onRequestClose, book }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [newAvailability, setNewAvailability] = useState(book.availability); // Initialize with the current availability

  const correctPassword = 'admin'; // Replace with the password you want to use


  const handleDelete = async () => {
    if (password === correctPassword) {

    const bookToDelete = {
      title: book.title,
      edition: book.edition,
      copy: book.copy, 
    };
  
    try {
      const response = await fetch('http://cosc-257-node08.cs.amherst.edu:3000/books', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookToDelete),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error deleting book:', errorMessage);
        return;
      }
  
      console.log('Book deleted successfully!');
      setIsDeleting(false);
      onRequestClose();

    } catch (error) {
      console.error('Error deleting book:', error.message);

    }

  } else {
    alert('Incorrect password. You do not have permission to delete a book.');
    setIsDeleting(false);
  }

  };

  const handleToggleAvailability = async () => {
    // Toggle the availability status
    const updatedAvailability = newAvailability === 'available' ? 'not available' : 'available';
    setNewAvailability(updatedAvailability);
  
    // Make a PATCH request to update the availability on the server
    try {
      const response = await fetch(`http://localhost:3000/books/${book.title}/${book.edition}/${book.copy}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          availability: updatedAvailability,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error updating availability:', errorMessage);
        // Optionally, you can revert the local state if the server update fails
        setNewAvailability(newAvailability);
      }
    } catch (error) {
      console.error('Error updating availability:', error.message);
      // Optionally, you can revert the local state if the server update fails
      setNewAvailability(newAvailability);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Book Details"
    >


    <div className='bookdetails'>
      <h2>{book.title}</h2>
      <p>Author: {book.author_name}</p>
      <p>Editor: {book.editor_name}</p>
      <p>Publisher: {book.pname}</p>
      <p>Date of Publication: {book.year}</p>
      <p>Faculty: {book.fname}</p>
      <p>Edition: {book.edition}</p>
      <p>Category: {book.category}</p>
      <p>Availability: {book.availability}</p>
      <p>Additional Notes: {book.additional_notes}</p>

    </div>
      {/* Add your additional book information here */}

<div className='bookactions'>
    {isDeleting ? (
              <div>
                <p>Enter your password to confirm deletion:</p>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleDelete}>Confirm Delete</button>
              </div>
            ) : (
              <>
            <button onClick={handleToggleAvailability}>
              {newAvailability === 'available' ? 'Set as Not Available' : 'Set as Available'}
            </button>
            <button onClick={() => setIsDeleting(true)}>Delete</button>
          </>
            )}
      {/* <button>Edit</button> */}
      {/* <button>Reserve Book</button> */}
      <button onClick={onRequestClose}>Close</button>
    </div>
    </Modal>
  );
};

export default BookDetailsModal;
