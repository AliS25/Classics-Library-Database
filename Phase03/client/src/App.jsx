import { useState } from 'react'
import React, {Fragment} from 'react'
import './App.css'
import BookList from './components/BookList'
import Filters from './components/Filters'
import AddBookModal from './components/AddBookModal';
import PasswordModal from './components/PasswordModal'; // Add PasswordModal component import


function App() {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const correctPassword = 'admin'; // Replace with your desired password

  const handleAddBook = () => {
    console.log('Add book button clicked');
    // Open the password modal
    setIsPasswordModalOpen(true);
  };

  const handlePasswordSubmit = () => {
    // Check if the entered password is correct
    if (password === correctPassword) {
      // Open the Add Book modal
      setIsPasswordModalOpen(false);
      setIsAddBookModalOpen(true);
    } else {
      alert('Incorrect password. You do not have permission to add a book.');
    }
  };

  const handleAddBookSubmit = (book) => {
    // Perform logic to add the book to the database
    console.log('Adding book to the database:', book);

    // Close the Add Book modal
    setIsAddBookModalOpen(false);
  };

  return (
    <>
      <div className='nav'>
        <h2>Holloway Classics Library Database</h2>
        <button  onClick={handleAddBook}>Add Book</button>

      </div>

      <div className='header'>
        <h2>Welcome to the Holloway Classics Library Database!</h2>
      </div>


      <div className='bookList'>
        <BookList />
      </div>

      <div className='footer'>
      <p>&copy; 2023 Holloway Classics Library. All rights reserved.</p>
    </div>

    {/* Render the Password Modal */}
    <PasswordModal
        isOpen={isPasswordModalOpen}
        onRequestClose={() => setIsPasswordModalOpen(false)}
        onPasswordSubmit={handlePasswordSubmit}
        password={password}
        setPassword={setPassword}
      />

      {/* Render the Add Book modal */}
      <AddBookModal
        isOpen={isAddBookModalOpen}
        onRequestClose={() => setIsAddBookModalOpen(false)}
        onAddBookSubmit={handleAddBookSubmit}
      />
    </>
  )
}

export default App
