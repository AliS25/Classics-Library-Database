import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [quickFilterText, setQuickFilterText] = useState('');

  const getBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/books');
      const jsonData = await response.json();

      setBooks(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const columnDefs = [
    { headerName: 'Title', field: 'title' , sortable: true, filter: 'agTextColumnFilter', lockVisible:true},
    { headerName: 'Author', field: 'author_name', sortable: true, filter: false , lockVisible:true},
    { headerName: 'Editor', field: 'editor_name', sortable: true, filter: false, lockVisible:true},
    { headerName: 'Publisher', field: 'pname', sortable: true, filter: false, lockVisible:true},
    { headerName: 'Date of Publication', field: 'year', sortable: true, filter: false , lockVisible:true},
    { headerName: 'Edition', field: 'edition', sortable: true, filter: false, lockVisible:true},
    { headerName: 'Category', field: 'category', sortable: true, filter: false, lockVisible:true},
  ];

  return (
    <div>
        
        <div className='search-filter-div'>
            <label htmlFor="quickFilter">Quick Filter: </label>
            <input
            className='search-filter'
            type="text"
            placeholder="Search all columns"
            onChange={(e) => setQuickFilterText(e.target.value)}
            />
        </div>

        <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
          <AgGridReact 
          animateRows = {true} 
          columnDefs={columnDefs} 
          rowData={books} 
          quickFilterText={quickFilterText}/>
        </div>
    </div>
  );
};

export default BookList;
