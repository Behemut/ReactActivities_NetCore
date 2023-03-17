import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity, ActivityFormValues } from "../models/activity";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";
import { Profile } from "../models/profile";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'https://localhost:7194/api';
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if(token && config.headers) config.headers.Authorization = `Bearer ${token}`
    return config
})

axios.interceptors.response.use(async response => {
        await sleep(1000)
        return response
    }, 
    (error: AxiosError) => {
        const {data, status, config} = error.response as AxiosResponse
        
        switch (status) {
            case 400:  

                if(config.method === 'get' && data.errors.hasOwnProperty('id')) 
                    router.navigate('/not-found');

                if(data.errors) {
                    const modalStateErrors = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key])
                        }
                    }
                    throw modalStateErrors.flat();
                }
                else  toast.error('Bad request');

                break;
            case 401:
                toast.error('Unauthorized');   
                break;
            case 403:
                toast.error('Forbidden');
                break;
            case 404:
                router.navigate('/notfound');
                break;
            case 500:
                store.commonStore.setServerError(data);
                router.navigate('/server-error');
                break;
                default:
                    break;
    }
    return Promise.reject(error)
})

const requests = {
    get: <T> (url: string) => axios.get(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del:<T> (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),    
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>('/activities', activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profile/${username}`),
    uploadPhoto: (file: Blob) => {
        let Formdata = new FormData();
        Formdata.append('File', file);  
        return axios.post('photos', Formdata, {
            headers: {'Content-type': 'multipart/form-data'}
        })
    },
    deletePhoto: (id: string) => requests.del(`/photos/${id}`),
    setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
    updateProfile: (profile: Partial<Profile>) => requests.put(`/profile`, profile),
    updateFollowing : (username: string) => requests.post(`/following/${username}`, {}),
    listFollowings: (username: string, predicate: string) => 
                    requests.get<Profile[]>(`/following/${username}?predicate=${predicate}`),
}
    
const agent = { Activities, Account, Profiles };
export default agent;