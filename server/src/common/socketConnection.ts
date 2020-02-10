
import { listen, Server } from "socket.io";

export class SocketInstance {
    private socketServer: Server;
    public listen = (server: any): Server => {
        this.socketServer = listen(server);
        return this.socketServer;
    }

    public emit = (event: string, ...args: any[]): void => {
        if (this.socketServer) {
            this.socketServer.emit(event, args);
        }
    }
}

export class SocketConnectionSingleton {
    static instance: SocketInstance;

    constructor() {
        if (!SocketConnectionSingleton.instance) {
            SocketConnectionSingleton.instance = new SocketInstance();
        }
    }

    private getInstance() {
        return SocketConnectionSingleton.instance;
    }

    public listen = (server: any): any => { return this.getInstance().listen(server); };
    public emit = (event: string, ...args: any[]): any => { this.getInstance().emit(event, args); };

}
export const SocketConnection = new SocketConnectionSingleton();