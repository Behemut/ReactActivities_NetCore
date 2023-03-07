import { makeAutoObservable } from "mobx";
import { ServerError } from "../models/ServerError";

export default class CommonStore{
    error: ServerError | null = null;
   // token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this)
    }

    setServerError = (error: ServerError) => {
        this.error = error;
    }

}