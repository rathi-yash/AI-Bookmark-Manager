// background.js
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    // Send bookmark to server
    console.log("Starting!")
    fetch('https://your-server.com/api/bookmarks', {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Show notification with clustering result
      console.log("Fetched")
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Bookmark Clustered',
        message: `Your bookmark has been added to the "${data.category}" cluster.`
      });
    })
    .catch(error => {
      // Show error notification
      console.log("Error!")
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Error',
        message: 'Houston, we are down. Failed to process the bookmark.'
      });
    });
  });
  