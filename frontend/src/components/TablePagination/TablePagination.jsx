import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TablePagination = ({ tableProps }) => {
  const {
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    state,
  } = tableProps;

  const { pageIndex } = state;

  return (
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <div className='mr-2'>
        Page{' '}
        <Form.Control
          style={{ width: '50px', display: 'inline' }}
          type='number'
          value={pageIndex + 1}
          onChange={(e) => {
            const pageNumber = Number(e.target.value) - 1;

            gotoPage(pageNumber);
          }}
        />
        <strong>{` of ${pageCount}`}</strong>
      </div>
      <Button
        type='button'
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </Button>

      <Button
        className='ml-2'
        type='button'
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </Button>
    </div>
  );
};

export default TablePagination;
