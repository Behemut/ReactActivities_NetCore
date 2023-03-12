import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const validationSchema =  Yup.object({
    email: Yup.string().required('The email is required'),
    password: Yup.string().required('The password is required'),
})

export default observer (function LoginForm(){
        const {userStore} = useStore();
        const {login} = userStore;
        
    return(
  
    <Formik 
        initialValues={{email: '', password: '', error: null}} 
        onSubmit={(values, {setErrors}) => login(values).catch(error => setErrors({error: 'Invalid email or password'}))}
        validationSchema={validationSchema}
        >
            {({handleSubmit, isValid, isSubmitting, dirty, errors}) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                    <MyTextInput name='email' placeholder='Email' />
                    <MyTextInput name='password' placeholder='Password' type='password' />
                    <ErrorMessage name='error' render={() => 
                        <Label style={{marginBottom: 10}} basic color='red' content={errors.error} />} 
                    />
                    <Button  disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}

    </Formik>
    )
})