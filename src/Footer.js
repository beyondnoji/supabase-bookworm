import React from 'react'

const Footer = ({count, readCount}) => {
  return (
    <footer> 
      <p>{count} List {count === 1 ? "book" : "books"} </p> 
      <p>Finished: {readCount}</p>
    </footer>
  )
}

export default Footer