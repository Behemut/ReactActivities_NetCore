import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../models/activity";


interface Props {
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    activity: Activity | undefined;
    submitting: boolean;
}


export default function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {

    const initialFormState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    const [activityForm, setActivityForm] = useState(initialFormState);


    function handleSubmit() {
        createOrEdit(activityForm);
    }


    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivityForm({...activityForm, [name]: value});
    }


    return(
    <Segment clearing>
    <Form onSubmit={handleSubmit}   autoComplete='off'>
        <Form.Input placeholder='Title' name='title' value={activityForm.title}  onChange={handleInputChange}  />
        <Form.TextArea placeholder='Description' value={activityForm.description} name="description" onChange={handleInputChange}/>
        <Form.Input placeholder='Category' value={activityForm.category} name="category"  onChange={handleInputChange}  />
        <Form.Input type='date' placeholder='Date' value={activityForm.date} name="date" onChange={handleInputChange} />
        <Form.Input placeholder='City' value={activityForm.city} name="city" onChange={handleInputChange}/>
        <Form.Input placeholder='Venue' value={activityForm.venue} name="venue"  onChange={handleInputChange}/>
        <Button loading={submitting} floated="right" positive type='submit' content='Submit' />
        <Button onClick={closeForm} floated="right" color="red" type='button' content='Cancel' />
    </Form>
    </Segment>
    )
}