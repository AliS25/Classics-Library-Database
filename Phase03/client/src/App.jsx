import { useState } from 'react'
import React, {Fragment} from 'react'
import './App.css'
import BookList from './components/BookList'
import Filters from './components/Filters'
import bookPic from './assets/LibraryBanner.jpg'

function App() {

  return (
    <>
      <div>
        <h1>Holloway Classics Library Database</h1>
      </div>

      <img className= "img" src={bookPic} alt="book" width="100%" height="auto"></img>

      <div className='bookList'>
        <BookList />
      </div>
    </>
  )
}

export default App
