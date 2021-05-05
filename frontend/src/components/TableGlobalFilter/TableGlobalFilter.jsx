import React from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TableGlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <div className='d-flex align-items-center'>
      <span className='mr-2'>Search:</span>
      <div className='position-relative'>
        <FontAwesomeIcon
          icon={faSearch}
          className='position-absolute text-black-50 input-icon-position'
        />
        <Form.Control
          className='input-with-icon'
          type='text'
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TableGlobalFilter;
