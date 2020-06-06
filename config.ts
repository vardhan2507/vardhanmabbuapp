class Config {

    //general
    private readonly port = process.env.PORT || 3000;
    private readonly socketPort = process.env.socketPort || 2507;

    public get config(): any {
        return this;
    }

}
export default new Config().config;
