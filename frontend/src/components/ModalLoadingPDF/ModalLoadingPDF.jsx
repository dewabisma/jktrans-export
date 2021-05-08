import React from 'react';
import { Modal } from 'react-bootstrap';

import Loader from '../Loader/Loader';

const ModalLoadingPDF = ({ show }) => {
  return (
    <Modal show={show} backdrop='static' keyboard={false} className='pl-0'>
      <Modal.Header>
        <Modal.Title>Sedang Memproses Berkas...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Loader />
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoadingPDF;
