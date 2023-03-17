import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import ValidationError from "../errors/ValidationError";

const validationSchema =  Yup.object({
    displayName: Yup.string().required('The display name is required'),
    username : Yup.string().required('The username is required'),
    email: Yup.string().required('The email is required'),
    password: Yup.string().required('The password is required')   
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Password must contain at least 6 characters, one uppercase, one number and one special case character"
    ),
    passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref('password'), null!], 'Passwords must match')
})

export default  observer(function RegisterForm(){
    const {userStore} = useStore();
    const {register} = userStore;
    
    return(
        <Formik 
            initialValues={{ displayName: '',username: '',email: '', password: '', error: null }} 
            onSubmit={(values, {setErrors}) => register(values).catch(error => setErrors({error: error}))}
            validationSchema={validationSchema}
            >
                {({handleSubmit, isValid, isSubmitting, dirty, errors}) => (
                    <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                        <Header as='h2' content='Register to Reactivities' color='teal' textAlign='center' />                
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='displayName' placeholder='Display Name' />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyTextInput name='password' placeholder='Password' type='password' />
                        <MyTextInput name='passwordConfirmation' placeholder='Password Confirmation' type='password' />
                        <ErrorMessage name='error' render={() => 
                            <ValidationError errors={errors.error} />
                        } 
                        />
                        <Button  disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Register now' type='submit' fluid />
                    </Form>
                )}
    
        </Formik>
        )
    })