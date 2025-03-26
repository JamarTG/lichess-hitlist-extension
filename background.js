chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "notify") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icon.png",
        title: "Lichess Opponent Reminder",
        message: `${message.opponentId} is on your hitlist`,
        priority: 2
      });
    }
  });
  