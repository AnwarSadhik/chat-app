import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;
    console.log(`Init Socket Listeners...`);

    io.on("connect", (socket) => {
      console.log(`New Socket Connected --> ${socket.id}`);

      socket.on("event:message", async ({ userName, message }: { userName: string, message: string }) => {
        console.log(`New Message from ${userName} : ${message}`);
        // console.log("GOT HERE", message);

        io.emit("message", { userName, message });
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
