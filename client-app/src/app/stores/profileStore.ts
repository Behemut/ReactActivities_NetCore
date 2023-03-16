import { makeAutoObservable, runInAction } from "mobx";
import { Photo, Profile } from "../models/profile";
import agent from "../api/agent";
import { store } from "./store";

export default class ProfileStore{
    profile : Profile | null = null;
    loading = false
    uploading = false
    loadingProfile = false

    constructor () {
        makeAutoObservable(this)
    }
    get isCurrentUser() {
        if(store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username
        }
        return false
    }
    setProfile = (profile: Profile) => {
        this.profile = profile;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            this.setProfile(profile);
            this.loadingProfile = false;
        } catch (error) {
            console.log(error);
          runInAction(()=> this.loadingProfile = false )
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(()=> {
                if (this.profile){
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user){
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })
        }
        catch(error) {
            console.log(error);
            runInAction(()=> this.uploading = false)
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.user!.image = photo.url;
            runInAction(()=> {
                this.profile!.photos!.find(a => a.isMain)!.isMain = false;
                this.profile!.photos!.find(a => a.id === photo.id)!.isMain = true;
                this.profile!.image = photo.url;
                this.loading = false;
            })
        }
        catch(error) {
            console.log(error);
            runInAction(()=> this.loading = false)
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(()=> {
                this.profile!.photos = this.profile!.photos!.filter(a => a.id !== photo.id);
                this.loading = false;
            })
        }
        catch(error) {
            console.log(error);
            runInAction(()=> this.loading = false)
        }
    }
}