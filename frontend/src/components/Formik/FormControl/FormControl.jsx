import React from 'react';
import Input from '../Input/Input';

const FormControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    // case 'checkbox':
    //   return <Checkbox {...rest} />;
    // case 'select':
    //   return <Select {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
