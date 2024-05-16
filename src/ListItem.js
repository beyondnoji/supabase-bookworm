import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'; 

const ListItem = ( {book, deleteBook, updateCheck} ) => {
  return (
    <li className='book' key={book.name}>
        <input
            type='checkbox'
            onChange={() => updateCheck(book.read, book.id)}
            checked={book.read}
        />
        <label
            style={ (book.read) ? { textDecoration: 'line-through' } : null}
            onDoubleClick={() => updateCheck(book.read, book.id)}
            
        >{book.name} by {book.author} ({book.year})
        </label>

        <FaTrashAlt
            onClick={ () => deleteBook(book.id)}
            role='button'
            tabIndex='0' 
            aria-label={`Delete ${book.id}`}
        />

    </li>
  )
}

export default ListItem