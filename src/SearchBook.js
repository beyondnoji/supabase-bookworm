import React from 'react'

const SearchBook = ( {search, setSearch} ) => {
  return (
    // We put onSubmit preventDefault so that it does not refresh on pressing enter
    // it shud filter the list as it is typed
    // We now need to call items.filter in the Content component in App.js using this string
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <input
        name='search'
        type='text'
        role='searchbox'
        placeholder='Search books'
        value={search} // set value of input field to search state
        onChange={ // on any change, update state to field's value 
          (e) => setSearch(e.target.value)}
        // EVENT.TARGET.VALUE MEANS THE VALUE OF THE FIELD ON WHICH EVENT OCCURED
      /> 
    </form>
  )
}

export default SearchBook