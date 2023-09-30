import React from "react";
import { Button, Header} from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import * as XLSX from 'xlsx';


export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities }  = activityStore;


    const exportToExcel = () => {
        const data = groupedActivities.flatMap(([group, activities]) =>
            activities.map((activity) => ({
                Title: activity.title,
                Date: activity.date,
                Category: activity.category,
                City: activity.city,
                Venue: activity.venue,
            }))
        );

            const fileName = `excel_report_${new Date().getTime()}.xlsx`;
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Report");

            XLSX.writeFile(wb, fileName);
        }


    return (
        <>
        
        <Button content='Export Excel' icon='file excel'
                color='green' 
                floated='right'
                onClick={exportToExcel}
                
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