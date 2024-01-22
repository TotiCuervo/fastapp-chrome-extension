chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "getJwt") {
      chrome.storage.local.get(["jwt"], ({ jwt }) => {
        sendResponse({ jwt });
      });
  
      return true;
    }
  });