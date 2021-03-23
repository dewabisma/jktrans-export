import React from 'react';
import { Table, Row, Col } from 'react-bootstrap';

import Header from '../../components/Header/Header';

const DetailRekapan = () => {
  return (
    <>
      <Header />

      <button
        className='btn btn-primary'
        type='button'
        data-toggle='collapse'
        data-target='#collapseExample'
        aria-expanded='false'
        aria-controls='collapseExample'
      >
        Button with data-target
      </button>

      <div className='collapse' id='collapseExample'>
        <div className='card card-body'>
          Some placeholder content for the collapse component. This panel is
          hidden by default but revealed when the user activates the relevant
          trigger.
        </div>
      </div>
    </>
  );
};

export default DetailRekapan;
