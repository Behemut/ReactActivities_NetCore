import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { makeAutoObservable, runInAction } from "mobx"
import { store } from "./store"
import { toast } from "react-toastify"


export default class CommentStore {
    comments : ChatComments[] =[]
    loadingInitial = false
    hubConnection : HubConnection | null = null 

    constructor() {
        makeAutoObservable(this)
    }

    //methods
    createHubConnection = (activityId : string) => {
        if (store.activityStore.selectedActivity){
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('https://localhost:7194/chat?activityId='  + activityId, {
                        accessTokenFactory: () => store.userStore.user?.token!
                 })
                .withAutomaticReconnect()
                //.configureLogging(store.commonStore.developmentMode ? 'debug' : 'error')
                .configureLogging(LogLevel.Information)
                .build()

            this.hubConnection.start().catch(error => toast.error('Error establishing connection: ', error))
            this.hubConnection.on('LoadComments', (comments: ChatComments[]) => {
                runInAction(() => this.comments = comments)
            })
            this.hubConnection.on('ReceiveComment', (comment: ChatComments) => {
                runInAction(() => this.comments.push(comment))
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => toast.error('Error stopping connection: ', error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }
}