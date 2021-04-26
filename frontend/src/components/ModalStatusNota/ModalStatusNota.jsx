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
  const formikRef = useRef();

  const optionsPembayaran = [
    {
      key: 'Sudah Dibayar',
      value: true,
    },
    {
      key: 'Belum Dibayar',
      value: false,
      props: {
        selected: true,
      },
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
      props: {
        selected: true,
      },
    },
  ];

  const initialValues = {
    franco: false,
    statusPembayaran: false,
    statusPengiriman: false,
  };

  const validationSchema = Yup.object({
    franco: Yup.boolean().required('Diperlukan'),
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
              formikRef.current = formik;

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

                  <FormControl
                    control='checkbox'
                    name='franco'
                    label='Franco'
                  />
                </FormikForm>
              );
            }}
          </Formik>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='submit'
            onClick={(e) => formikRef.current.submitForm()}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalStatusNota;
