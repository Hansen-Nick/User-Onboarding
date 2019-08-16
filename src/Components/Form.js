import React from 'react'
import { withFormik, Form, Field } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';



function form({values, errors, touched}) {
    return (
        <Form>
            <div>
                {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                <Field type='firstName' name='firstName' placeholder='First Name'/>
            </div>
            <div>
                {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                <Field type='lastName' name='lastName' placeholder='Last Name'/>
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field type='email' name='email' placeholder='Email'/>
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field type='password' name='password' placeholder='Password'/>
            </div>
            <label>
            <Field type='checkbox' name='tos' checked={values.tos} /> Accept TOS
            </label>
            <button>Submit!</button>
        </Form>
    )
}


const OnboardForm = withFormik({
    mapPropsToValues({firstName, lastName, email, password, tos}) {
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string()
        .required("First name is required"),
        lastName: Yup.string()
        .required('Last name is required'),
        email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Password is required')
    })

})(form)

export default OnboardForm