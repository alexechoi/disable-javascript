chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.contentSettings.javascript.get({
      primaryUrl: tab.url
    }, function(details) {
      var newSetting = (details.setting === 'allow') ? 'block' : 'allow';
      chrome.contentSettings.javascript.set({
        primaryPattern: '<all_urls>',
        setting: newSetting
      });
      // Reload the tab to apply the new setting
      chrome.tabs.reload(tab.id);
    });
  });
  