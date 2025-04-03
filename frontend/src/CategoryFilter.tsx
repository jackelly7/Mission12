import { useState, useEffect } from 'react';

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/Book/GetBookTypes'
        );
        console.log('fetched response:', response);
        const data = await response.json();
        console.log('fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories;
  }, [categories]);

  return (
    <div>
      <h5>Book Genres</h5>
      <div>
        {categories.map((c) => (
          <div key={c}>
            <input type="checkbox" id={c} value={c} />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
