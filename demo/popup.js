document.getElementById('myButton').addEventListener('click', function() {
  chrome.runtime.sendMessage({ command: 'createNotification' });
});
