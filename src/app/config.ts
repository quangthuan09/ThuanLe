export class Config{
    private _apiUrl = "https://practice-lazada.herokuapp.com/";
    private _contactApi = "https://office.nsvnapp.com/mobile.php/";
    private _headerUrlImage = "https://office.nsvnapp.com/";
    public get headerUrlImage() {
        return this._headerUrlImage;
    }
    public set headerUrlImage(value) {
        this._headerUrlImage = value;
    }
    private appKey="viet_nguyen_quoc";
    private _app_key = "D3raCMSver30";
    private _ver = "1.0";
    private _act = "config";
    private _op = "mobile";
    public get apiUrl() {
        return this._apiUrl;
    }
    public set apiUrl(value) {
        this._apiUrl = value;
    }
    public get op() {
        return this._op;
    }
    public set op(value) {
        this._op = value;
    }
    public get act() {
        return this._act;
    }
    public set act(value) {
        this._act = value;
    }

    public get app_key() {
        return this._app_key;
    }
    public set app_key(value) {
        this._app_key = value;
    }
    public get ver() {
        return this._ver;
    }
    public set ver(value) {
        this._ver = value;
    }
    public get contactApi() {
        return this._contactApi;
    }
    public set contactApi(value) {
        this._contactApi = value;
    }
}