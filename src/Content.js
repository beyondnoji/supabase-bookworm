import React from 'react'
import BookList from './BookList' 

const Content = ( {books, deleteBook, updateCheck} ) => {
    return (
        <main>
            {books.length ? (
                <BookList
                    books={books}
                    deleteBook={deleteBook}
                    updateCheck={updateCheck}
                /> 
            ) : (
                <p style={{marginTop: '2rem'}}>Your list is empty</p> 
            )}
        </main>
    )
}

export default Content