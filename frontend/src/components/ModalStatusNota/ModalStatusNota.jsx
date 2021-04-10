import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';

import Message from '../Message/Message';

const ModalStatusNota = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buttonHandler = () => {
    handleClose();
  };

  return (
    <>
      <Button variant='link' type='button' onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit} size='2x' className='text-secondary' />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        className='pl-0 pr-0'
      >
        <Modal.Header closeButton>
          <Modal.Title>Status Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='statusPembayaran'>
              <Form.Label>Status Pembayaran</Form.Label>

              <Form.Control as='select'>
                <option value='true'>Sudah Dibayar</option>
                <option value='false'>Belum Dibayar</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='statusPengiriman'>
              <Form.Label>Status Pengiriman</Form.Label>

              <Form.Control as='select'>
                <option value='true'>Sudah Diterima</option>
                <option value='false'>Sudah Dikirim</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={buttonHandler}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalStatusNota;
