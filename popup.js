const toggleSwitch = document.getElementById("toggleScrollKey");

chrome.storage.local.get("isScrollKeyDisabled", (data) => {
  toggleSwitch.checked = data.isScrollKeyDisabled;
});

toggleSwitch.addEventListener("change", () => {
  const isEnabled = toggleSwitch.checked;

  chrome.storage.local.set({ isScrollKeyDisabled: isEnabled }, () => {
    chrome.runtime.sendMessage({ action: "toggleStatus", enabled: isEnabled });
  });
});
