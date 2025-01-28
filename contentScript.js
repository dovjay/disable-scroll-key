let isScrollKeyBlockingEnabled = false;

// List of keys to disable
const disabledKeys = [
  "Space",      // Spacebar
  "PageUp",     // Page Up
  "PageDown",   // Page Down
  "Home",       // Home
  "End",        // End
  "ArrowUp",    // Up Arrow
  "ArrowDown",  // Down Arrow
  "ArrowLeft",  // Left Arrow
  "ArrowRight"  // Right Arrow
];

// Listen for toggle messages from the background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggleScrollKey") {
    isScrollKeyBlockingEnabled = message.enabled;
  }
});

// Add an event listener for keydown
document.addEventListener("keydown", (event) => {
  if (isScrollKeyBlockingEnabled && disabledKeys.includes(event.code)) {
    event.preventDefault(); // Prevent the default behavior
    console.log(`Blocked key: ${event.code}`); // Log the blocked key
  }
});
