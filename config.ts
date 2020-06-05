class Config {

    //general
    private readonly port = process.env.PORT || 4000;

    public get config(): any {
        return this;
    }

}
export default new Config().config;
