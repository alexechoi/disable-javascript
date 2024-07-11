document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleJs');
    const statusDiv = document.getElementById('status');
  
    function updateStatus() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.contentSettings.javascript.get({
          primaryUrl: activeTab.url
        }, function(details) {
          if (details.setting === 'allow') {
            statusDiv.textContent = 'JavaScript is ENABLED';
            statusDiv.style.color = 'green';
          } else {
            statusDiv.textContent = 'JavaScript is DISABLED';
            statusDiv.style.color = 'red';
          }
        });
      });
    }
  
    toggleButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        chrome.contentSettings.javascript.get({
          primaryUrl: activeTab.url
        }, function(details) {
          var newSetting = (details.setting === 'allow') ? 'block' : 'allow';
          chrome.contentSettings.javascript.set({
            primaryPattern: '<all_urls>',
            setting: newSetting
          }, function() {
            updateStatus();
          });
        });
      });
    });
  
    updateStatus();
  });
  