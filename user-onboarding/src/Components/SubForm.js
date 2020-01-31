import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field, yupToFormErrors, prepareDataForValidation} from "formik";
import * as Yup from 'yup';
import axios from 'axios'


const SubForm = ({status, values, errors, touched}) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log('status has changed', status);
        status && setUsers(info => [...users, status]);
    }, [status]);

   
    return(
        <div>
        <Form>
            <div>
                <label htmlFor='name'>Username:</label>
                <Field  
                 type='text'
                 name= 'name' 
                 placeholder= 'Name'
               />
               {touched.name && errors.name && <p>{errors.name}</p>}
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <Field  
                type='email' 
                name= 'email' 
                placeholder= 'Email'
                />
                {touched.email && errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label htmlFor='password'>Password:</label>
                <Field
                 type='password'
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

        {users.map(subInfo => {
          return(
              <div>
            <p>Name:{subInfo.name}</p>
            <p>Email:{subInfo.email}</p>
            </div>
          );
        })}
        </div>
    );
    
};
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
        TOS: Yup.boolean().required('Must agree to the terms')
    }),
    handleSubmit(values, {setStatus}){
        axios.post('https://reqres.in/api/users', values)
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