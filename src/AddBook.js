import React from 'react'
import { FaPlus } from 'react-icons/fa'; 
import { useRef } from 'react';

const AddBook = ( {book, books, setBook, createBook}) => {
    const { name, author, year } = book; // destructuring so we can more easily use variables
    const inputRef = useRef(); 

    return (
        <form className='addForm' onSubmit={ (e) => {
            e.preventDefault() 
            createBook() 
        }}>
        <input
            required
            ref={inputRef}
            placeholder='Name'
            value={name} 
            onChange={e => setBook({...book, name: e.target.value})}
        /> 
        <input
            required
            ref={inputRef}
            placeholder='Author'
            value={author} 
            onChange={e => setBook({...book, author: e.target.value})}
        /> 
        <input
            required
            ref={inputRef}
            placeholder='Year'
            value={year} 
            onChange={e => setBook({...book, year: e.target.value})}
        /> 
        <button
            aria-label='Add Book'
            type='submit'
            onClick={() => inputRef.current.focus()}
        >
            <FaPlus/> 
        </button>
        </form>
  )
}

export default AddBook