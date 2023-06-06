chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === 'createNotification') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon.png',
      title: 'Button clicked!',
      message: 'The button was clicked.'
    });
  }
});
