import React from "react";
import { useState } from 'react';

const Filters = () => {
    const [filteredbooks, setFilteredBooks] = useState([]);
    const [title, setTitle] = useState(''); // title is the name of the state variable, setTitle is the function that updates the state variable
    const [author, setAuthor] = useState('');
    const [editor, setEditor] = useState('');

    const handleSearch = () => {
        // filter books based on title, author, editor
        // set filteredbooks to the filtered list
        // try {
            

        // } catch (error) {
        //     console.error(error.message);
        // }
    }

    return (
        <div>
            <div className="filters">
                <label htmlFor="title">Book Title: </label>
                <input type="text"  id = "title" name = "title" value={title} onChange={e => setTitle(e.target.value)}/>
            
                <label htmlFor="author"> Original Author: </label>
                    <select name="author" id="author">
                        <option value="">All Authors</option>
                    </select>

                <label htmlFor="editor"> Editor: </label>
                    <select name="editor" id="editor">
                        <option value="">All Editors</option>
                    </select>
                
                {/* on click to button (handleSearch) */}
                <button  className='search-button'>SEARCH</button>
            </div>

            <div>
                <h4>Number of Total Books:</h4>
                <h4>Number of Results: </h4> 
                {/* shouold be {filteredbooks.length} when finished */}
            </div>
        </div>
    );
}

export default Filters;