import React, { useState } from "react";
import { Button, Header} from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import * as XLSX from 'xlsx';
import { Activity } from "../../../models/activity";
import agent from "../../../api/agent";
import { format } from "date-fns";



export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities }  = activityStore;
    const [activitiesList, setActivitiesList] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);
 
    const exportToExcel = async () => {
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
            const formatTime = "MM-dd-yyyy"

            const fileName = `excel_report_${format(new Date(), formatTime)}.xlsx` // name of the excel sheet
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Report");
            ws['!autofilter'] = { ref: `A1:C${data.length + 1}` }; // Set the range
            ws['!cols'] = [
              { width: 5 }, // Adjust column widths as needed
              { width: 15 },
              { width: 15 },
            ];
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