import React from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';

const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    // case 'checkbox':
    //   return <Checkbox {...rest} />;
    case 'select':
      return <Select {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
