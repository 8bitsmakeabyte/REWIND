/**
 * template.js
 * Adds interactivity and responsiveness enhancements to the Gratitude Journal template.
 * Written in a clear, human style.
 */

document.addEventListener('DOMContentLoaded', function () {
  // Sidebar navigation active state toggle
  const sidebarLinks = document.querySelectorAll('.sidebar-nav ul li a');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      // Remove active class from all links
      sidebarLinks.forEach(l => l.classList.remove('active'));
      // Add active class to clicked link
      this.classList.add('active');
    });
  });

  // Responsive sidebar toggle for small screens
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');

  function handleResize() {
    if (window.innerWidth <= 768) {
      sidebar.style.position = 'relative';
      sidebar.style.width = '100%';
      mainContent.style.marginLeft = '0';
    } else {
      sidebar.style.position = 'fixed';
      sidebar.style.width = '220px';
      mainContent.style.marginLeft = '220px';
    }
  }

  // Initial check
  handleResize();

  // Listen for window resize events
  window.addEventListener('resize', handleResize);

  // Add smooth scroll for sidebar links (if they link to sections)
  sidebarLinks.forEach(link => {
    if (link.hash) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // Button hover effect enhancement (optional)
  const buttons = document.querySelectorAll('button');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'scale(1.05)';
      button.style.transition = 'transform 0.2s ease';
    });
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'scale(1)';
    });
  });
});
