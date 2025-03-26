const getOpponentIds = () => {
  const playerLinks = document.querySelectorAll(".player.color-icon .user-link");
  const canGetOpponentId = playerLinks.length === 2;
  if (canGetOpponentId) {
    return [playerLinks[0].innerText.trim().toLowerCase().split(" ")[0], playerLinks[1].innerText.trim().toLowerCase().split(" ")[0]];
  }
  return null;
};

const checkOpponentAgainstHistlist = (data, player1, player2) => {
  const opponents = data.opponents || [];

  opponents.forEach((opponent) => {
    const opponentLower = opponent.toLowerCase();

    if (player1.endsWith(opponentLower)) {
      chrome.runtime.sendMessage({ type: "notify", opponentId: player1 });
    }
    if (player2.endsWith(opponentLower)) {
      chrome.runtime.sendMessage({ type: "notify", opponentId: player2 });
    }
  });
};

const checkOpponent = async () => {
  const opponentIds = getOpponentIds();

  if (opponentIds) {
    const [player1, player2] = opponentIds;
    chrome.storage.local.get(["opponents"], (data) => checkOpponentAgainstHistlist(data, player1, player2));
  }
};

window.addEventListener("load", checkOpponent);
