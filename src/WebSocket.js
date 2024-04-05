const socket = new WebSocket("wss://explodingkitten-8d1p86jf.b4a.run/ws");
const connectWebSocket = (updatedata, setIsConnected) => {
  socket.onopen = function () {
    console.log("Connected to WebSocket server!"); // Subscribe to the leaderboard update channel on the server
    const message = { type: "subscribe", channel: "leaderboard_updates" };
    socket.send(JSON.stringify(message));
    setIsConnected(true)
  };

  socket.onmessage = function (event) {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "DataUpdated") {
        const updatedGameState = data.value; // Assuming no optional chaining needed
        const objdata = new Object(updatedGameState)
        console.log(updatedGameState, "from me");
        // console.log(updatedata(updatedGameState));
        updatedata(objdata);
      } else {
        console.log(event.status);
      }
    } catch (error) {
      console.error("Error parsing data:", error);
      // Handle parsing errors (e.g., log, notify user)
    }
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
  };
  socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event.code, event.reason);
    setIsConnected(false);
  };
};

async function updateLeaderboard(name, score) {
  if (socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({
      type: "update",
      value: {
        username: name,
        score: score,
      },
    });

    try {
      await socket.send(message);

      // Create a new Promise to handle the response
      return new Promise((resolve, reject) => {
        const listener = function (event) {
          try {
            const serverData = JSON.parse(event.data);
            resolve(serverData);
            socket.onmessage = null; // Remove temporary listener
          } catch (error) {
            reject(error);
          } finally {
            socket.onmessage = null; // Remove temporary listener even on errors
          }
        };

        socket.onmessage = listener;
      });
    } catch (error) {
      return Promise.reject(error); // Reject on send error
    }
  } else {
    return Promise.reject({
      error: "WebSocket connection not open. Data not sent.",
    });
  }
}

export { connectWebSocket, updateLeaderboard };
