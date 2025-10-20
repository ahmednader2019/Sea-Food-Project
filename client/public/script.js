// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  // Add click event to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.textContent.trim().toLowerCase();
      
      // Filter products (in a real application, this would filter based on product categories)
      // For now, we'll just show all products
      productCards.forEach(card => {
        card.style.display = 'block';
      });
    });
  });
  
  // Search functionality
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (searchTerm) {
        // Filter products based on search term
        productCards.forEach(card => {
          const productName = card.querySelector('.product-name').textContent.toLowerCase();
          
          if (productName.includes(searchTerm)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      } else {
        // Show all products if search is empty
        productCards.forEach(card => {
          card.style.display = 'block';
        });
      }
    });
  }
  
  // Allow search on Enter key
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
  
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for hash links
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
      }
    });
  });
});

