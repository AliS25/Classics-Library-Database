// BookDetailsModal.js

import React from 'react';
import Modal from 'react-modal';
import './BookDetailsModal.css';

Modal.setAppElement('#root');

const BookDetailsModal = ({ isOpen, onRequestClose, book }) => {
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
      <p>Edition: {book.edition}</p>
      <p>Category: {book.category}</p>
      <p>Availability: {book.availability}</p>
      <p>Additional Notes: {book.additional_notes}</p>

</div>
      {/* Add your additional book information here */}

<div className='bookactions'>
      <button>Edit</button>
      <button>Delete</button>
      <button>Reserve Book</button>
      <button onClick={onRequestClose}>Close</button>
    </div>
    </Modal>
  );
};

export default BookDetailsModal;
