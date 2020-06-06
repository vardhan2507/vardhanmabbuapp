import { Controller, Get, Post, Put, Delete, Middleware } from '@overnightjs/core';
import { FulfillmentRequest } from '../models/fulfillment.model';
import { INTENT_NAMES, SOCKET_EVENTS } from '../enums';
import { textResponse } from '../utils/dialogflow-fulfillment';
import socket from '../../socket';

@Controller('v1/bot')
export class FacingController {

    @Post('fulfillment')
    getFulfillmentRequest(req, res) {

        let request: FulfillmentRequest = req.body;
        switch (request.queryResult.intent.displayName) {

            case INTENT_NAMES.WelcomIntent:
                if (request.queryResult.parameters.passcode) {
                    console.log('Got the Passcode', request.queryResult.parameters.passcode);
                    let dataIndex = socket.socketData.findIndex(item => {
                        return item.passcode == parseInt(request.queryResult.parameters.passcode, 10);
                    });
                    console.log("Passcode is in index", dataIndex);
                    if (dataIndex >= 0) {
                        socket.socketData[dataIndex].botSessionId = request.session;
                    }
                    res.send(textResponse('You can navigate anywhere in VardhanMabbu now. Please say "Navigate to projects or work... to navigate"'));
                }
                else {
                    res.send(textResponse('Please say your name...'));
                }
                break;

            case INTENT_NAMES.Navigation:
                let dataIndex = socket.socketData.slice().reverse().findIndex(item => {
                    return item.botSessionId == request.session;
                });
                dataIndex = dataIndex >= 0 ? socket.socketData.length - 1 - dataIndex : dataIndex
                console.log("Session Index is", dataIndex);
                if (dataIndex >= 0) {
                    let roomId = socket.socketData[dataIndex].roomId;
                    socket.emitData(roomId, SOCKET_EVENTS.NAVIGATE, { url: request.queryResult.parameters.url });
                    res.send(textResponse(`Navigating to ${request.queryResult.parameters.url}... `));
                }
                else {
                    res.send(textResponse(`Please enter the passcode first!`));
                }
                break;
        }
    }

}