import { useEffect, useState } from "react";
import { Button,  Header,  Segment } from "semantic-ui-react";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ActivityFormValues } from "../../../models/activity";
import LoadingComponent from "../../../layouts/components/LoadingComponents";
import { v4 as uuid } from 'uuid';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../common/form/MyTextInput";
import MyTextArea from "../../../common/form/MyTextArea";
import MySelectInput from "../../../common/form/MySelectInput";
import { categoryOptions } from "../../../common/options/categoryOptions";
import MyCustomDateInput from "../../../common/form/MyCustomDateInput";


export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loadActivity, loadingInitial} = activityStore;

    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema =  Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required').min(8), 
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required'),
        city: Yup.string().required('The activity city is required'),
        venue: Yup.string().required('The activity venue is required')
    })


    useEffect(() => {
        if(id) loadActivity(id)
                .then(activity => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity])  
    
    function handleFormSubmit (activity: ActivityFormValues){
        if(!activity.id){
            let newActivity = {
                ...activity,
                id: uuid()}     
            createActivity(newActivity).then(() => navigate(`/activities/${activity.id}`))
        }
        else{
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent />

    return(
    <Segment clearing>
        <Header content='Activity Details' sub color='teal' />
        <Formik enableReinitialize 
        initialValues={activity} 
        onSubmit={values => handleFormSubmit(values)}
        validationSchema={validationSchema}
        >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
               <Form className="ui form"   onSubmit={handleSubmit}   autoComplete='off'>          
               <MyTextInput  placeholder='Title' name="title" />
               <MyTextArea rows={3}  placeholder='Description'  name="description" />
               <MySelectInput options={categoryOptions}  placeholder='Category' name="category"    />
               <MyCustomDateInput  
                        placeholderText='Date'  
                        name="date" 
                        showTimeSelect
                        dateFormat={'MMMM d, yyyy h:mm aa'}
                        timeCaption="time"                      
                />
                <Header content='Location details' sub color='teal' />
               <MyTextInput  placeholder='City'  name="city" />
               <MyTextInput  placeholder='Venue'  name="venue"  />
               <Button 
               loading={isSubmitting} 
               disabled={isSubmitting || !dirty || !isValid}   
               floated="right" 
               positive type='submit' 
               content='Submit' />
               <Button as={Link} to="/activities" floated="right" color="red" type='button' content='Cancel' />
           </Form>
        )}
        </Formik>
    </Segment>
    )
})