
import { listen, Server } from 'socket.io';

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

    public listen = (server: any): any => this.getInstance().listen(server);

    public groupChanged = (): void => {
        this.getInstance().emit('groups-changed');
    }

    public roomChanged = (groupId: number): void => {
        this.getInstance().emit(`rooms-changed-${groupId}`);
    }

    public chatMessageReceived = (roomId: number): void => {
        this.getInstance().emit(`chats-changed-${roomId}`);
    }

    public suggestionChanged = (roomId: number): void => {
        this.getInstance().emit(`suggestions-changed-${roomId}`);
    }

    public sessionsChanged = (roomId: number): void => {
        this.getInstance().emit(`sessions-changed-${roomId}`);
    }

    public emit = (event: string, ...args: any[]): any => { };

}
export const SocketConnection = new SocketConnectionSingleton();
