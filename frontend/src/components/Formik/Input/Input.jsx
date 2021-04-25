import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const Input = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {(fieldProps) => {
          const { form, field, meta } = fieldProps;

          return <Form.Control {...field} {...rest} />;
        }}
      </Field>
      <ErrorMessage name={name} />
    </Form.Group>
  );
};

export default Input;
