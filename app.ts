
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import config from './config';
import * as controllers from './src/controllers';
import socket from './socket';

class App extends Server {

    constructor() {
        super();
        this.corsPolicy();
        this.middleWare();
        this.loadControllers();
        socket;
    }

    private corsPolicy = () => {
        express.Router()
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private middleWare = () => {
        this.app.enable('trust proxy');
        this.app.use(bodyParser.json({ limit: '1mb' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }


    private loadControllers = () => {
        let controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        this.addControllers(controllerInstances, null);
    }

    public start() {
        this.app.listen(config.port, () => {
            console.log("Starting Beast... serving from port=> :" + config.port);
        })
    }

}

export default App;