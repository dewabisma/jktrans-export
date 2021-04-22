import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormControl from '../FormControl/FormControl';

const FormContainer = ({ children }) => {
  const initialValues = {
    name: '',
    email: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'min 3 characters')
      .max(8, 'max 8 characters')
      .required('Required'),
    email: Yup.string().email('Enter a valid email').required('Required'),
  });

  const onSubmit = () => {
    alert('working');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
};

export default FormContainer;
