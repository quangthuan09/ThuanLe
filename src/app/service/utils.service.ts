import { Config } from "../config";
import { Injectable } from "@angular/core";

export class UtilsService {
    private _config: Config;

    constructor(){
        this.config = new Config();

    }

    public get config(): Config {
        return this._config;
    }
    public set config(value: Config) {
        this._config = value;
    }
}