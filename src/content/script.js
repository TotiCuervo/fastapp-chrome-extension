window.addEventListener("message", (event) => {
    if (event.source !== window) {
      return;
    }
    console.log({event})
    const { jwt } = event.data;
    if (jwt) {
      chrome.storage.local.set({ jwt }, () => {
        console.log("JWT saved to local storage", jwt);
      });
    }
  });

console.log("boop")