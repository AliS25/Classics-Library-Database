import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import BookDetailsModal from './BookDetailsModal';



const BookList = () => {
  const [books, setBooks] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const getBooks = async () => {
    try {
      //const response = await fetch(`http://cosc-257-node08.cs.amherst.edu:3000/books`);
      const response = await fetch(`http://cosc-257-node08.cs.amherst.edu:3000/books`);

      const jsonData = await response.json();

      setBooks(jsonData);

      console.log(jsonData); //can DELETE

      // Extract unique categories from the book data
      const uniqueCategories = Array.from(new Set(jsonData.map(book => book.category).filter(category => category !== null)));
      setCategories(uniqueCategories);


    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    // Filter books based on the selected category
    const filtered = selectedCategory
      ? books.filter(book => book.category === selectedCategory)
      : books;

    setFilteredBooks(filtered);
  }, [selectedCategory, books]);


  const actionButton = (params) => {
      console.log(params.data.copy);
  }

  const columnDefs = [
    { headerName: 'Title', field: 'title' , sortable: true, filter: 'agTextColumnFilter', lockVisible:true, resizable:true},
    { headerName: 'Author', field: 'author_name', sortable: true, filter: 'agTextColumnFilter' , lockVisible:true, resizable:true},
    { headerName: 'Editor', field: 'editor_name', sortable: true, filter: 'agTextColumnFilter', lockVisible:true, resizable:true},
    { headerName: 'Publisher', field: 'pname', sortable: true, filter: 'agTextColumnFilter', lockVisible:true, resizable:true},
    { headerName: 'Date of Publication', field: 'year', sortable: true, filter: false , lockVisible:true, resizable:true},
    { headerName: 'Edition', field: 'edition', sortable: true, filter: false, lockVisible:true, resizable:true},
    { headerName: 'Category', field: 'category', sortable: true, filter: 'agTextColumnFilter', lockVisible:true, resizable:true},
    { headerName: 'Actions', field: 'View Details', resizable:true, cellRenderer: (params) => <button onClick={()=>handleViewDetails(params)}>View Book Details</button> }
  ];

  const handleViewDetails = (book) => {
    setSelectedBook(book.data);
    setIsModalOpen(true);
  };

  return (
    <div>
        
        <div className='search-filter-div'>
            <label htmlFor="quickFilter">Quick Search: </label>
            <input
            className='search-filter'
            type="text"
            placeholder="Search all columns"
            onChange={(e) => setQuickFilterText(e.target.value)}
            />

            {/* Category dropdown */}
            <label htmlFor="categoryFilter">Category: </label>
            <select
              className='search-filter'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

        </div>

        <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
          <AgGridReact 
          animateRows = {true} 
          columnDefs={columnDefs} 
          rowData={filteredBooks} 
          quickFilterText={quickFilterText}
          pagination={true}/>
        </div>

         {/* Render the modal */}
      {selectedBook && (
        <BookDetailsModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          book={selectedBook}
        />
      )}


    </div>
  );
};

export default BookList;
