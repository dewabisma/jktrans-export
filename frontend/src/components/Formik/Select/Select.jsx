import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Form } from 'react-bootstrap';

const Select = (props) => {
  const { name, label, options, optionsKeyValue, ...rest } = props;
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {(fieldProps) => {
          const { field, meta, form } = fieldProps;

          return (
            <Form.Control as='select' {...field} {...rest}>
              {options.map((option) => (
                <option
                  key={option[optionsKeyValue.key]}
                  value={option[optionsKeyValue.value]}
                  {...option.props}
                >
                  {option[optionsKeyValue.key]}
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

Select.defaultProps = {
  optionsKeyValue: {
    key: 'key',
    value: 'value',
  },
};

export default Select;
