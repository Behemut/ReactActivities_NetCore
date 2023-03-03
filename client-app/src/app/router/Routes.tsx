import React from "react";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layouts/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
import ActivityDetails from "../features/activities/details/ActivityDetails";

export const routes:  RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
           // {path: "", element: <HomePage/> },
            {path: "activities",element: <ActivityDashboard/> },
            {path: "activities/:id",element: <ActivityDetails/> },            
            {path: "createActivity",element: <ActivityForm key='create'/>,  },
            {path: "manageActivity/:id",element: <ActivityForm key='manage'/>,  },
            {path: "detailsActivity",element: <ActivityDetails/> },

        ]
    }

]


export const router = createBrowserRouter(routes)

