console.log('sw-tips.js');

// Fetch tip & save in storage
const updateTip = async () => {
    console.log("get tip from tips.json and update it in the local storage");
    const response = await fetch('https://extension-tips.glitch.me/tips.json');
    const tips = await response.json();
    const randomIndex = Math.floor(Math.random() * tips.length);
    console.log("set a random tip to local storage");
    return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = 'tip';

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
    console.log("create alarm");
    const alarm = await chrome.alarms.get(ALARM_NAME);
    // update tip once a day
    if (typeof alarm === 'undefined') {
        chrome.alarms.create(ALARM_NAME, {
            delayInMinutes: 1,
            periodInMinutes: 1440
        });
        // update immediately
        updateTip();
    }
}

createAlarm();

// automatically update tips every day by alarm
chrome.alarms.onAlarm.addListener(updateTip);

// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("the action to get tip from local storage");
    if (message.greeting === 'tip') {
        chrome.storage.local.get('tip').then(sendResponse);
        console.log("the action to get tip successfully");
        return true;
    }
});
