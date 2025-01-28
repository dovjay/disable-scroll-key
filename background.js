chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isScrollKeyDisabled: false });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getStatus") {
    chrome.storage.local.get("isScrollKeyDisabled", (data) => {
      sendResponse({ enabled: data.isScrollKeyDisabled });
    });
    return true;
  } else if (message.action === "toggleStatus") {
    chrome.storage.local.set({ isScrollKeyDisabled: message.enabled }, () => {
      chrome.tabs.query({ url: "<all_urls>" }, (tabs) => {
        tabs.forEach((tab) => {
          try {
            chrome.tabs.sendMessage(tab.id, {
              action: "toggleScrollKey",
              enabled: message.enabled,
            });
          } catch (error) {
            console.error(`Error sending message to tab ${tab.id}:`, error);
          }
        });
      });
    });
  }
});
