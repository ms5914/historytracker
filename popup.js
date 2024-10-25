document.addEventListener('DOMContentLoaded', function() {
  // Display history
  function displayHistory() {
    chrome.storage.local.get('history', (data) => {
      const historyList = document.getElementById('history-list');
      historyList.innerHTML = '';
      
      if (data.history && data.history.length > 0) {
        // Sort by most recent first
        const sortedHistory = data.history.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        sortedHistory.forEach(visit => {
          const entry = document.createElement('div');
          entry.className = 'site-entry';
          
          const time = new Date(visit.timestamp).toLocaleString();
          entry.innerHTML = `
            <div>${visit.url}</div>
            <div class="timestamp">${time}</div>
          `;
          
          historyList.appendChild(entry);
        });
      } else {
        historyList.innerHTML = '<p>No history yet</p>';
      }
    });
  }
  
  // Clear history
  document.getElementById('clearHistory').addEventListener('click', function() {
    chrome.storage.local.set({ 'history': [], 'sites': [] }, function() {
      displayHistory();
    });
  });
  
  // Initial display
  displayHistory();
});
