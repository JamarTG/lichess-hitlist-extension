const getOpponentIds = () => {
  const playerLinks = document.querySelectorAll(".player.color-icon .user-link");
  const canGetOpponentId = playerLinks.length === 2;
  if (canGetOpponentId) {
    return [playerLinks[0].innerText.trim().toLowerCase().split(" ")[0], playerLinks[1].innerText.trim().toLowerCase().split(" ")[0]];
  }
  return null;
};

const checkOpponentAgainstHistlist = () => (data) => {
  let opponents = data.opponents || [];

  opponents.forEach((opponent) => {
    const player1IsOnHislist = player1.endsWith(opponent.toLowerCase())
    const player2IsOnHislist = player2.endsWith(opponent.toLowerCase())

    if (player1IsOnHislist) chrome.runtime.sendMessage({ type: "notify", opponentId: player1 });
    if (player2IsOnHislist) chrome.runtime.sendMessage({ type: "notify", opponentId: player2 });

  });
};

const checkOpponent = async () => {
  const opponentIds = getOpponentIds();

  if (opponentIds) {
    const [player1, player2] = opponentIds;
    chrome.storage.local.get(["opponents"]);
  }
};

window.addEventListener("load", checkOpponent);