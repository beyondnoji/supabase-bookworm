import { useState, useEffect} from 'react'; 
import { supabase } from './client';
import AddBook from './AddBook';
import Content from './Content';
import Header from './Header';
import Footer from './Footer';
import SearchBook from './SearchBook';

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState(
    {name: '', author: '', year: '', read: false}
  )
  const [search, setSearch] = useState(''); 
  const [fetchError, setFetchError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true); 
  const { name, author, year } = book; // destructuring so we can more easily use variables

  useEffect(() => {
    // Call fetchPost func when app loads
    async function fetchData() {
      try {
        const error = await fetchBooks() 
        if (error) throw Error('Did not receive expected data') 
        setFetchError(null) // if got past, no error here
      } catch (err) {
        setFetchError(err.message)
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData()
  }, [])

  async function fetchBooks() {
    const { data, error } = await supabase 
      .from('books') 
      .select()
      .order('read', 'author', 'name', 'year', 'id') // select all 
      if (error) setFetchError(error)
    setBooks(data) // set books state to queried list
    return error; 
  }

  async function createBook() {
    // const id = books.length ? books[books.length - 1].id + 1: 1 
    const { error } = await supabase 
      .from('books')
      .insert([
        {name, author, year}
      ],
      { onConflict: 'name'},
      { ignoreDuplicates: false}
      )
      .single() 
      setBook({name: '', author: '', year: ''}) 
      if (error) setFetchError(error)
      fetchBooks()
      return error; 
  }

  async function updateCheck (read, id) {
    const { error } = await supabase 
      .from('books') 
      .update({read: !read})
      .eq('id', id)
      if (error) setFetchError(error)
      console.log(error)
      fetchBooks()
      return error; 
  }

  async function deleteBook(id) {
    const { error } = await supabase
      .from('books') 
      .delete()
      .eq('id', id)
      if (error) setFetchError(error)
      fetchBooks()
      return error; 
  }

  return (
    <main> 
      <Header
        title='Bookworm!'
      />
      <AddBook
        book={book}
        books={books}
        setBook={setBook}
        createBook={createBook}
      /> 
      <SearchBook
        search={search}
        setSearch={setSearch}
      />
      <main>
      {isLoading && <p>Loading books. . .</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: Please reload the page`}</p>}
        {!fetchError && !isLoading &&
        <Content
          books={books.filter(
            book => (
              (book.name).toLowerCase().includes(search.toLowerCase())||
              (book.year).toLowerCase().includes(search.toLowerCase()) ||
              (book.author).toLowerCase().includes(search.toLowerCase())
          ))}
          deleteBook={deleteBook}
          updateCheck={updateCheck}
        />}
      </main>
      <Footer
        count={books.length}
        readCount={
          books.filter(book => book.read === true).length
        }
      />
    </main>
  );
}

export default App;
