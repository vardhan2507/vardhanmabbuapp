import * as express from 'express';
import * as http from 'http';
import * as socketio from "socket.io";
import config from './config';
import { SOCKET_EVENTS } from './src/enums';

class IoSocket {

    private io;
    passcode = 1000;
    socketData = [];

    constructor() {
        // this.connectToSocket();
    }



    getNextPasscode() {
        return ++this.passcode;
    }

    connectToSocket(server) {
        console.log("Socket is listening");
        // let app = express();
        // let httpServer = http.createServer(app);
        this.io = socketio(server);

        this.io.on('connection', (socket) => {
            let uuid = socket.handshake.query.uuid;
            console.log('Client Connected...', uuid);
            socket.join(uuid);
            let passcode = this.getNextPasscode();
            this.socketData.push({ passcode: passcode, roomId: uuid, botSessionId: null });
            this.io.to(uuid).emit(SOCKET_EVENTS.PASSCODE, passcode);

            socket.on('disconnect', () => {
            });
        });

        // this.io.listen(config.socketPort);
    }

    public getSocketInstance() {
        return this.io;
    }

    public emitData(roomName, eventName, data) {
        this.io.to(roomName).emit(eventName, data);
    }

}

const socket = new IoSocket();

export default socket;
