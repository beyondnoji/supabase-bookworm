import React from 'react'
import ListItem from './ListItem'

const BookList = ( {books, deleteBook, updateCheck} ) => {
  return (
    <ul>
        {books.map( book => (
            <ListItem
                book={book}
                deleteBook={deleteBook}
                updateCheck={updateCheck}
            />
        ))}
    </ul>
  )
}

export default BookList