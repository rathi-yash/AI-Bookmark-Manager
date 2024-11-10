document.addEventListener('DOMContentLoaded', function() {
    const bookmarksList = document.getElementById('bookmarks-list');
  
    chrome.storage.sync.get('capturedBookmarks', function(data) {
      const bookmarks = data.capturedBookmarks || [];
      
      if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<p>No bookmarks captured yet.</p>';
      } else {
        const html = '<ul>' + bookmarks.map(bookmark => 
          `<li><a href="${bookmark.url}" target="_blank">${bookmark.title}</a></li>`
        ).join('') + '</ul>';
        
        bookmarksList.innerHTML = html;
      }
    });
  });
  