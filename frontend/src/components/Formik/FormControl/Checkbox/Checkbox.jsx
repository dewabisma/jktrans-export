import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

import FormErrorMessage from '../../FormErrorMessage/FormErrorMessage';

const Checkbox = (props) => {
  const { name, label, ...rest } = props;
  return (
    <Form.Group controlId={name}>
      <Field name={name}>
        {(fieldProps) => {
          const { field, meta } = fieldProps;

          return (
            <Form.Check
              type='checkbox'
              label={label}
              isInvalid={meta.error && meta.touched}
              checked={field.value}
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

export default Checkbox;
