import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const Select = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {(fieldProps) => {
          const { field, meta, form } = fieldProps;

          return (
            <Form.Control as='select' {...field} {...rest}>
              {options.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.key}
                </option>
              ))}
            </Form.Control>
          );
        }}
        <ErrorMessage name={name} />
      </Field>
    </Form.Group>
  );
};

export default Select;
