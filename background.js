let visitedSites = new Set();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const url = new URL(tab.url);
    // Skip chrome:// urls and other browser pages
    if (!url.protocol.startsWith('chrome')) {
      visitedSites.add(url.hostname);
      chrome.storage.local.set({ 'sites': Array.from(visitedSites) });
      
      // Store visit time
      const visit = {
        url: url.hostname,
        timestamp: new Date().toISOString()
      };
      
      chrome.storage.local.get('history', (data) => {
        const history = data.history || [];
        history.push(visit);
        chrome.storage.local.set({ 'history': history });
      });
    }
  }
});
