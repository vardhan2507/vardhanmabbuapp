class Config {

    //general
    private readonly port = process.env.PORT || 3000;
    private readonly socketPort = process.env.socketPort || 4444;
    //security
    private readonly FIREBASE_CONFIG = {
        apiKey: process.env.firebase_apikey || null,
        authDomain: process.env.firebase_authDomain || null,
        databaseURL: process.env.firebase_databaseURL || null,
        projectId: process.env.firebase_projectId || null,
        storageBucket: process.env.firebase_storageBucket || null,
        messagingSenderId: process.env.firebase_messagingSenderId || null,
        appId: process.env.firebase_appId || null
    }

    public get config(): any {
        return this;
    }

}
export default new Config().config;
