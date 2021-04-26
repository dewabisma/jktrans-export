import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';

import Message from '../Message/Message';
import FormControl from '../Formik/FormControl/FormControl';

const ModalStatusNota = () => {
  const [show, setShow] = useState(false);
  const submitFormRef = useRef();

  const optionsPembayaran = [
    {
      key: 'Sudah Dibayar',
      value: true,
    },
    {
      key: 'Belum Dibayar',
      value: false,
    },
  ];

  const optionsPengiriman = [
    {
      key: 'Sudah Diterima',
      value: true,
    },
    {
      key: 'Sudah Dikirim',
      value: false,
    },
  ];

  const initialValues = {
    franco: false,
    statusPembayaran: false,
  };

  const validationSchema = Yup.object({
    statusPembayaran: Yup.boolean().required('Diperlukan'),
    statusPengiriman: Yup.boolean().required('Diperlukan'),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submitHandler = () => {
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}
          >
            {(formik) => {
              submitFormRef.current = formik.submitForm;
              return (
                <FormikForm>
                  <FormControl
                    control='select'
                    options={optionsPembayaran}
                    name='statusPembayaran'
                    label='Status Pembayaran'
                  />

                  <FormControl
                    control='select'
                    options={optionsPengiriman}
                    name='statusPengiriman'
                    label='Status Pengiriman'
                  />
                </FormikForm>
              );
            }}
            <Form.Group controlId='statusPembayaran'>
              <Form.Label>Status Pembayaran</Form.Label>

              <Form.Control as='select'>
                <option value='Select something' selected hidden disabled>
                  Pilih status pembayaran
                </option>
                <option value='true'>Sudah Dibayar</option>
                <option value='false'>Belum Dibayar</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='statusPengiriman'>
              <Form.Label>Status Pengiriman</Form.Label>

              <Form.Control as='select'>
                <option value='Select something' selected hidden disabled>
                  Pilih status pengiriman
                </option>
                <option value='true'>Sudah Diterima</option>
                <option value='false'>Sudah Dikirim</option>
              </Form.Control>
            </Form.Group>
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            onClick={(e) => submitFormRef.current()}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalStatusNota;
