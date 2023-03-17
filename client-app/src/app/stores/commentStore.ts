import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { makeAutoObservable, runInAction } from "mobx"
import { store } from "./store"
import { toast } from "react-toastify"
import { ChatComments } from "../models/comments"


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
                .withUrl('https://localhost:7194/chats?activityId='  + activityId, {
                        accessTokenFactory: () => store.userStore.user!.token
                 })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()

            this.hubConnection.start().catch((error: string) => toast.error('Error establishing connection: ' + error))
            
            this.hubConnection.on('LoadComments', (comments: ChatComments[]) => {
                runInAction(() => {
                        comments.forEach(comment => {
                            comment.createdAt = new Date(comment.createdAt + 'Z')
                        })
                    this.comments = comments
                })
            })

            this.hubConnection.on('ReceiveComment', (comment: ChatComments) => {
                runInAction(() => {
                   
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment)
                });
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch((error: string) => toast.error('Error stopping connection: ' + error))
    }

    clearComments = () => {
        this.comments = []
        this.stopHubConnection()
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id
        try {
            await this.hubConnection?.invoke('SendComment', values)
            
        
        } catch (error) {
            toast.error('Problem sending comment: ' + error)
        }
    }


}