import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';

const Input = (props) => {
  const { name, label, ...rest } = props;

  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {(fieldProps) => {
          const { form, field, meta } = fieldProps;

          return (
            <Form.Control
              isInvalid={meta.error && meta.touched}
              {...field}
              {...rest}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={FormErrorMessage} />
    </Form.Group>
  );
};

export default Input;
