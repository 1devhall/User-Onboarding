import React, {useState} from 'react';
import {withFormik, Form, Field, yupToFormErrors} from "formik";
import * as Yup from 'yup';
import axios from 'axios'


const SubForm = ({status, values, errors, touched}) => {

    const [info, setInfo] = useState([]);

    useEffect(() => {
        
    }, [status]);

   
    return(

        <Form>
            <div>
                <label htmlFor='name'>Name:</label>
                <Field  
                 type='text'
                 name= 'name' 
                 placeholder= 'Name'
               />
               {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label htmlFor='email'>email:</label>
                <Field  
                type='email' 
                name= 'email' 
                placeholder= 'Email'
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor='password'>password:</label>
                <Field
                 type='text'
                 name= 'password'
                 placeholder= 'Password'
               />
               {touched.password && errors.password && <p>{errors.password}</p>}
            </div>
            <div>
                <label htmlFor='TOS'>I agree to Terms of Service:</label>
                <Field 
                 id="TOS"
                 type='checkbox'
                 name= 'TOS'
                 check= {values.TOS}
               />
            </div>
            <button type='submit'>Submit</button>
        </Form>
    )
    
}
const FormikForm = withFormik({
    mapPropsToValues({name, email, password, TOS}){
        return {
            name: '',
            email:'',
            password:'',
            TOS: false

        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Must enter name'),
        email: Yup.string().required('Must enter email'),
        password: Yup.string().required('Must enter password'),
        TOS: Yup.string().required('Must agree to the terms')
    }),
    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users')
        .then(res => {
            console.log('success', res);
            setStatus(res.data)
        })
        .catch(err => 
            console.log(err.response)
        );
    }
})(SubForm);
export default FormikForm;