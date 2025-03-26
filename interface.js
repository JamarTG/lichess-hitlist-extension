document.getElementById("addOpponentButton").addEventListener("click", () => {
    const opponentName = document.getElementById("opponentName").value.trim().toLowerCase();
    
    if (opponentName) {
      chrome.storage.local.get(["opponents"], (data) => {
        let opponents = data.opponents || [];
        
        if (!opponents.includes(opponentName)) {
          opponents.push(opponentName);
          chrome.storage.local.set({ opponents });
          alert(`"${opponentName}" added to the hitlist`);
        } else {
          alert(`"${opponentName}" is already on your hitlist`);
        }
      });
    } else {
      alert("Please enter a username");
    }
  });
  