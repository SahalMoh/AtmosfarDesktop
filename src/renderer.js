const { shell } = require('electron');

document.addEventListener('click', (event) => {
  // Check if the clicked element is an anchor (<a>) tag
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault(); // Prevent the default link behavior
    
    // Open the URL in the system's default browser
    shell.openExternal(event.target.href);
  }
});
