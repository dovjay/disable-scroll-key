let isScrollKeyBlockingEnabled = false;

const disabledKeys = [
  "Space",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight"
];

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleScrollKey") {
    isScrollKeyBlockingEnabled = message.enabled;
  }
});

document.addEventListener("keydown", (event) => {
  if (isScrollKeyBlockingEnabled && disabledKeys.includes(event.code)) {
    event.preventDefault();
    console.log(`Blocked key: ${event.code}`);
  }
});
