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
  const { name, author, year } = book; // destructuring so we can more easily use variables

  useEffect(() => {
    // Call fetchPost func when app loads
    fetchBooks() 
  }, [])

  async function fetchBooks() {
    const { data } = await supabase 
      .from('books') 
      .select()
      .order('read', 'year') // select all 
    setBooks(data) // set books state to queried list
  }

  async function createBook() {
    // const id = books.length ? books[books.length - 1].id + 1: 1 
    await supabase 
      .from('books')
      .insert([
        {name, author, year}
      ])
      .single() 
      setBook({name: '', author: '', year: ''}) 
      fetchBooks()
  }

  async function updateCheck (read, id) {
    await supabase 
      .from('books') 
      .update({read: !read})
      .eq('id', id)
      fetchBooks()
  }

  async function deleteBook(id) {
    await supabase
      .from('books') 
      .delete()
      .eq('id', id)
      console.log(id)
      fetchBooks()
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
      <Content
        books={books.filter(
          book => (
            (book.name).toLowerCase().includes(search.toLowerCase())||
            (book.year).toLowerCase().includes(search.toLowerCase()) ||
            (book.author).toLowerCase().includes(search.toLowerCase())
        ))}
        deleteBook={deleteBook}
        updateCheck={updateCheck}
      />
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
