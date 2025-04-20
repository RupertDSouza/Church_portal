// Handle mobile dropdowns
document.addEventListener('DOMContentLoaded', function() {
  // Handle dropdowns
  const dropdowns = document.querySelectorAll('.header_nav_container .dropdown, .menu_nav .dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (toggle && content) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        document.querySelectorAll('.header_nav_container .dropdown, .menu_nav .dropdown').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
            other.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current dropdown
        const isActive = dropdown.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive.toString());
        
        // Adjust positioning for different screen sizes
        if (window.innerWidth <= 1024) {
          // For mobile menu
          const rect = content.getBoundingClientRect();
          if (rect.bottom > window.innerHeight) {
            content.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        } else {
          // For desktop
          const rect = toggle.getBoundingClientRect();
          const dropdownRect = content.getBoundingClientRect();
          
          // Check if dropdown would go off screen
          if (rect.right + dropdownRect.width > window.innerWidth) {
            content.style.left = 'auto';
            content.style.right = '0';
          } else {
            content.style.left = '0';
            content.style.right = 'auto';
          }
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header_nav_container .dropdown, .menu_nav .dropdown')) {
      document.querySelectorAll('.header_nav_container .dropdown, .menu_nav .dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Handle hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu');
  const overlay = document.querySelector('#overlay');
  const menuClose = document.querySelector('.menu_close');
  const body = document.body;

  function openMenu() {
    menu.classList.add('active');
    overlay.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    // Close all dropdowns when closing menu
    document.querySelectorAll('.header_nav_container .dropdown, .menu_nav .dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
    });
  }

  if (hamburger && menu && overlay && menuClose) {
    hamburger.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link (except dropdown toggles)
    menu.querySelectorAll('a').forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', closeMenu);
      }
    });
  }

  // Handle search functionality
  const searchIcon = document.querySelector('.search');
  const searchContainer = document.querySelector('.header_search_container');
  const searchForm = document.querySelector('#searchForm');
  const searchInput = document.querySelector('#searchInput');
  const searchModal = document.querySelector('#searchModal');
  const searchClose = document.querySelector('#searchModal .close');

  if (searchIcon && searchContainer) {
    searchIcon.addEventListener('click', function() {
      searchContainer.classList.toggle('active');
      if (searchContainer.classList.contains('active')) {
        searchInput.focus();
      }
    });
  }

  if (searchForm && searchInput && searchModal) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchModal.style.display = 'block';
        body.style.overflow = 'hidden';
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', function() {
      searchModal.style.display = 'none';
      body.style.overflow = '';
    });
  }

  // Close search modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === searchModal) {
      searchModal.style.display = 'none';
      body.style.overflow = '';
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      // Reset mobile menu state
      closeMenu();
      searchContainer.classList.remove('active');
    }
    
    // Adjust dropdown positions
    document.querySelectorAll('.header_nav_container .dropdown').forEach(dropdown => {
      const content = dropdown.querySelector('.dropdown-content');
      if (content && dropdown.classList.contains('active')) {
        const rect = dropdown.querySelector('.dropdown-toggle').getBoundingClientRect();
        const dropdownRect = content.getBoundingClientRect();
        
        if (rect.right + dropdownRect.width > window.innerWidth) {
          content.style.left = 'auto';
          content.style.right = '0';
        } else {
          content.style.left = '0';
          content.style.right = 'auto';
        }
      }
    });
  });
}); 