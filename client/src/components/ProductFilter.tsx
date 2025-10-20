import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  img: string;
  price?: string;
  description?: string;
}

interface ProductFilterProps {
  products: Product[];
  onFilteredProducts: (products: Product[]) => void;
}

export default function ProductFilter({ products, onFilteredProducts }: ProductFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fresh Fish', 'Frozen Fish', 'Shellfish', 'Imported'];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProducts(term, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category);
  };

  const filterProducts = (search: string, category: string) => {
    let filtered = products;

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Filter by search term
    if (search.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    onFilteredProducts(filtered);
  };

  return (
    <>
      {/* Search Bar */}
      <div className="search-container animate-scaleIn delay-400">
        <div className="search-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="search-btn" onClick={() => handleSearch(searchTerm)}>
            <img src="/assets/63-62.svg" alt="search" className="search-icon" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-section scroll-animate">
        <div className="filter-buttons" data-stagger="100">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

