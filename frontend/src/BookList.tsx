import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('https://localhost:5000/Book/AllBooks');
      const data = await response.json();
      setBooks(data);
    };
    fetchBooks();
  }, []);
  return (
    <>
      <h1>Books</h1>
      <br />
      {books.map((b) => (
        <div>
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
            <li>Classification: {b.classification}</li>
            <li>Page Count: {b.pageCount}</li>
            <li>Price: ${b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
