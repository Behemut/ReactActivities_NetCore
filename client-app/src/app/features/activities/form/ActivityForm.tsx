import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../models/activity";
import LoadingComponent from "../../../layouts/components/LoadingComponents";
import { v4 as uuid } from 'uuid';


export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {loading, createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if(id) loadActivity(id)
                .then(activity => setActivity(activity!))
    }, [id, loadActivity])  
    


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    function handleSubmit (){
        if(!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
        else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent />

    return(
    <Segment clearing>
    <Form onSubmit={handleSubmit}   autoComplete='off'>
        <Form.Input placeholder='Title' name='title' value={activity.title}  onChange={handleInputChange}  />
        <Form.TextArea placeholder='Description' value={activity.description} name="description" onChange={handleInputChange}/>
        <Form.Input placeholder='Category' value={activity.category} name="category"  onChange={handleInputChange}  />
        <Form.Input type='date' placeholder='Date' value={activity.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder='City' value={activity.city} name="city" onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' value={activity.venue} name="venue"  onChange={handleInputChange}/>
        <Button loading={loading} floated="right" positive type='submit' content='Submit' />
        <Button as={Link} to="/activities" floated="right" color="red" type='button' content='Cancel' />
    </Form>
    </Segment>
    )
})