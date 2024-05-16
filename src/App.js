import './App.css';
import { useState, useEffect} from 'react'; 
import { supabase } from './client';
import AddBook from './AddBook';
import Content from './Content';

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState(
    {name: '', author: '', year: '', read: false}
  )
  const { name, author, year } = book; // destructuring so we can more easily use variables

  useEffect(() => {
    // Call fetchPost func when app loads
    fetchBooks() 
  }, [])

  async function fetchBooks() {
    const { data } = await supabase 
      .from('books') 
      .select() // select all 
    setBooks(data) // set books state to queried list
  }

  async function createBook() {
    const id = books.length ? books[books.length - 1].id + 1: 1 
    await supabase 
      .from('books')
      .insert(
        {id, name, author, year})
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
      <AddBook
        book={book}
        books={books}
        setBook={setBook}
        createBook={createBook}
      /> 
      <Content
        books={books}
        deleteBook={deleteBook}
        updateCheck={updateCheck}
      />
    </main>
  );
}

export default App;
