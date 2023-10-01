import React, { useState } from "react";
import { Button, Header} from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import * as XLSX from 'xlsx';
import { Activity } from "../../../models/activity";
import agent from "../../../api/agent";
import { set } from "date-fns";


export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities }  = activityStore;
    const [activitiesList, setActivitiesList] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);
 
    const exportToExcel = async () => {
        // const data = groupedActivities.flatMap(([group, activities]) =>
        //     activities.map((activity) => ({
        //         Title: activity.title,
        //         Date: activity.date,
        //         Category: activity.category,
        //         City: activity.city,
        //         Venue: activity.venue,
        //         Inventado : activity.title + " " + activity.date + " " + activity.category + " " + activity.city + " " + activity.venue
        //     })) 
        // );

            // const data = activitiesList.flatMap((activity) =>
            //     ({
            //         Title: activity.title,
            //         Date: activity.date,
            //         Category: activity.category,
            //         City: activity.city,
            //         Venue: activity.venue,
            //         Inventado : activity.title + " " + activity.date + " " + activity.category + " " + activity.city + " " + activity.venue
            //     }) 
            // );
            setLoading(true);
            const result = await agent.Products.get()  
            

            const data = result.products.flatMap((product: any ) =>
            ({
                Title: product.title,
                Price: product.price,
                Brand: product.brand,
                Description: product.description,
                Rating: product.rating,
            }))
            

            const fileName = `excel_report_${new Date().getTime()}.xlsx`;
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Report");

            XLSX.writeFile(wb, fileName);
            setLoading(false);
        }


    return (
        <>
        
        <Button content='Export Excel' icon='file excel'
                color='green' 
                floated='right'
                onClick={exportToExcel}
                loading={loading}
                />
        { 
            groupedActivities.map(([group, activities]) => (
                    <React.Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                        </Header>               
                        {activities.map((activity) => <ActivityListItem key={activity.id} activity={activity} />
                        )}
                    </React.Fragment>
                ))
        }
        </>
    );
})