import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import { format } from "date-fns";


export default class ActivityStore {
    //States for the class
    activityRegistry = new Map<string, Activity>()
    selectedActivity?: Activity  = undefined
    editMode = false
    loading = false
    loadingInitial = false
  
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        //return sort by date
        return Array.from(this.activityRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime()
        )
    }

    get groupedActivities() {
        return Object.entries(
                this.activitiesByDate.reduce((activities, activity) => {
                    const date = format(activity.date!, 'dd MMM yyyy');
                    activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                    return activities;
                }, {} as {[key: string]: Activity[]})
            )
    }

    private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;    
            return activity
        }        
        else {
            this.setLoadingInitial(true);
            try {
                activity= await agent.Activities.details(id);      
                this.setActivity(activity!);
                
                runInAction(() => {         
                    this.selectedActivity = activity;  
                })

                this.setLoadingInitial(false);    
                return activity;
            }
            catch (error) {
                this.setLoadingInitial(false);
            }
        }
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const activities = await agent.Activities.list();  
            activities.forEach((activity: Activity)  => {
                this.setActivity(activity); 
                })
                this.setLoadingInitial(false);                 
        }
        catch (error) {
            this.setLoadingInitial(false);     
        }
    }

    private setActivity = (activity: Activity) => {
        activity.date = new Date(activity.date!);
        this.activityRegistry.set(activity.id, activity);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    setLoading = (state: boolean) => {
        this.loading = state;
    }

    createActivity = async (activity: Activity) => {
      //  activity.id = uuid();
        this.setLoading(true);
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        try {
            this.setLoading(true);
            await agent.Activities.update(activity);
            runInAction(() => {
              //  this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
                this.activityRegistry.set(activity.id, activity);  
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        }
        catch (error) {
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}   // end of class ActivityStore

