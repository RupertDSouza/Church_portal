// Handle mobile dropdowns
document.addEventListener('DOMContentLoaded', function() {
  // Handle dropdowns
  const dropdowns = document.querySelectorAll('.header_nav_container .dropdown, .menu_nav .dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (toggle && content) {
      // Add keyboard navigation
      toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle.click();
        }
      });

      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns
        dropdowns.forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
            const otherToggle = other.querySelector('.dropdown-toggle');
            if (otherToggle) {
              otherToggle.setAttribute('aria-expanded', 'false');
            }
          }
        });
        
        // Toggle current dropdown
        const isActive = dropdown.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isActive.toString());
        
        // Adjust positioning for different screen sizes
        if (window.innerWidth <= 1024) {
          // For mobile menu
          if (isActive) {
            setTimeout(() => {
              const rect = content.getBoundingClientRect();
              if (rect.bottom > window.innerHeight) {
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            }, 0);
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

          // Adjust vertical position if needed
          if (dropdownRect.bottom > window.innerHeight) {
            content.style.maxHeight = `${window.innerHeight - rect.bottom - 20}px`;
          } else {
            content.style.maxHeight = '';
          }
        }
      });

      // Add keyboard navigation for dropdown items
      const dropdownLinks = content.querySelectorAll('a');
      dropdownLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextLink = dropdownLinks[index + 1] || dropdownLinks[0];
            nextLink.focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevLink = dropdownLinks[index - 1] || dropdownLinks[dropdownLinks.length - 1];
            prevLink.focus();
          } else if (e.key === 'Escape') {
            e.preventDefault();
            dropdown.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.header_nav_container .dropdown, .menu_nav .dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
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
    menuClose.focus();
  }

  function closeMenu() {
    menu.classList.remove('active');
    overlay.classList.remove('active');
    body.style.overflow = '';
    // Close all dropdowns when closing menu
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      const toggle = dropdown.querySelector('.dropdown-toggle');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    hamburger.focus();
  }

  if (hamburger && menu && overlay && menuClose) {
    hamburger.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Handle keyboard navigation
    hamburger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      }
    });

    menuClose.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeMenu();
      }
    });

    // Close menu when clicking a link (except dropdown toggles)
    menu.querySelectorAll('a').forEach(link => {
      if (!link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', closeMenu);
      }
    });
  }

  // // Handle search functionality
  // const searchIcon = document.querySelector('.search');
  // const searchContainer = document.querySelector('.header_search_container');
  // const searchForm = document.querySelector('#searchForm');
  // const searchInput = document.querySelector('#searchInput');
  // const searchModal = document.querySelector('#searchModal');
  // const searchClose = document.querySelector('#searchModal .close');

  // if (searchIcon && searchContainer) {
  //   searchIcon.addEventListener('click', function() {
  //     searchContainer.classList.toggle('active');
  //     if (searchContainer.classList.contains('active')) {
  //       searchInput.focus();
  //     }
  //   });

  //   // Add keyboard navigation
  //   searchIcon.addEventListener('keydown', function(e) {
  //     if (e.key === 'Enter' || e.key === ' ') {
  //       e.preventDefault();
  //       searchIcon.click();
  //     }
  //   });
  // }

  if (searchForm && searchInput && searchModal) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchModal.style.display = 'block';
        body.style.overflow = 'hidden';
        searchClose.focus();
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', function() {
      searchModal.style.display = 'none';
      body.style.overflow = '';
      searchIcon.focus();
    });

    // Add keyboard navigation
    searchClose.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        searchClose.click();
      }
    });
  }

  // Close search modal when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target === searchModal) {
      searchModal.style.display = 'none';
      body.style.overflow = '';
      searchIcon.focus();
    }
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 1024) {
        // Reset mobile menu state
        closeMenu();
        searchContainer.classList.remove('active');
      }
      
      // Adjust dropdown positions
      dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector('.dropdown-content');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (content && toggle && dropdown.classList.contains('active')) {
          const rect = toggle.getBoundingClientRect();
          const dropdownRect = content.getBoundingClientRect();
          
          if (rect.right + dropdownRect.width > window.innerWidth) {
            content.style.left = 'auto';
            content.style.right = '0';
          } else {
            content.style.left = '0';
            content.style.right = 'auto';
          }

          // Adjust vertical position if needed
          if (dropdownRect.bottom > window.innerHeight) {
            content.style.maxHeight = `${window.innerHeight - rect.bottom - 20}px`;
          } else {
            content.style.maxHeight = '';
          }
        }
      });
    }, 100);
  });
}); 