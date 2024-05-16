import React from 'react'

const Footer = ({count, readCount}) => {
  return (
    <footer> 
      <p>{count} {count === 1 ? "Book" : "Books"} </p> 
      <p>{readCount} Finished</p>
    </footer>
  )
}

export default Footer