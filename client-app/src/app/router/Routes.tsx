import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import NotFound from "../features/errors/NotFound";
import ServerErrors from "../features/errors/ServerErrors";
import LoginForm from "../features/users/LoginForm";
import ProfilePage from "../features/profiles/ProfilePage";

export const routes:  RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "activities",element: <ActivityDashboard/> },
            {path: "activities/:id",element: <ActivityDetails/> },            
            {path: "createActivity",element: <ActivityForm key='create'/>,  },
            {path: "manageActivity/:id",element: <ActivityForm key='manage'/>,  },
            {path: "detailsActivity",element: <ActivityDetails/> },
            {path: 'profiles/:username', element: <ProfilePage />},
            {path: "not-found",element: <NotFound/> },
            {path: "server-error",element: <ServerErrors/> },
            {path: "login",element: <LoginForm /> },
            {path: "*",element: <Navigate replace to='/not-found'/> },
        ]
    }

]


export const router = createBrowserRouter(routes)

