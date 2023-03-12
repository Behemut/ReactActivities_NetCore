import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore{
    error: ServerError | null = null
    token: string | null = sessionStorage.getItem('jwt');
    appLoaded = false;

    constructor() {
        makeAutoObservable(this)
        reaction(
            () => this.token,
            token => {
                if (token) sessionStorage.setItem('jwt', token);
                else sessionStorage.removeItem('jwt');
            }
    )}

    setServerError = (error: ServerError) => {
        this.error = error;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}