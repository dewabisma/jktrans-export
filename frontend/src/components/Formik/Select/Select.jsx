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
                <option key={option._id} value={option.jenisBarang}>
                  {option.jenisBarang}
                </option>
              ))}
            </Form.Control>
          );
        }}
      </Field>

      <ErrorMessage name={name} />
    </Form.Group>
  );
};

export default Select;
