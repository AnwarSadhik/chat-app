import http from "http";
import SocketService from "./services/Socket";

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8080;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server Started listening on :${PORT}`);
  });

  socketService.initListeners();
}

init();
