import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import NotFound from "../features/errors/NotFound";
import ServerErrors from "../features/errors/ServerErrors";

export const routes:  RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: "activities",element: <ActivityDashboard/> },
            {path: "activities/:id",element: <ActivityDetails/> },            
            {path: "createActivity",element: <ActivityForm key='create'/>,  },
            {path: "manageActivity/:id",element: <ActivityForm key='manage'/>,  },
            {path: "detailsActivity",element: <ActivityDetails/> },
            {path: "not-found",element: <NotFound/> },
            {path: "server-error",element: <ServerErrors/> },
            {path: "*",element: <Navigate replace to='/not-found'/> },
        ]
    }

]


export const router = createBrowserRouter(routes)

