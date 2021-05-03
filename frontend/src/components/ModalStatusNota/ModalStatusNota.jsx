import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';

import Message from '../Message/Message';
import FormControl from '../Formik/FormControl/FormControl';

const ModalStatusNota = ({ index, dataNota, setDataNota }) => {
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
    },
  ];

  const optionsPengiriman = [
    {
      key: 'Sudah Diterima',
      value: true,
    },
    {
      key: 'Sedang Dikirim',
      value: false,
    },
  ];

  const initialValues = {
    franco: dataNota[index].franco,
    statusPembayaran: dataNota[index].isPaid,
    statusPengiriman: dataNota[index].isDelivered,
  };

  const validationSchema = Yup.object({
    statusPembayaran: Yup.boolean().required('Diperlukan'),
    statusPengiriman: Yup.boolean().required('Diperlukan'),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeBeingMade = (currentValue) => {
    const { franco, statusPembayaran, statusPengiriman } = currentValue;
    return (
      franco !== dataNota[index].franco ||
      statusPembayaran !== dataNota[index].isPaid ||
      statusPengiriman !== dataNota[index].isDelivered
    );
  };

  const submitHandler = (values) => {
    const isChanged = changeBeingMade(values);

    if (isChanged) {
      const { franco, statusPembayaran, statusPengiriman } = values;

      const pembayaran =
        statusPembayaran === 'true' || statusPembayaran === true;
      const pengiriman =
        statusPengiriman === 'true' || statusPengiriman === true;

      const newData = dataNota.map((nota, indexNota) => {
        if (index === indexNota) {
          const editedData = { ...nota };

          editedData.franco = Boolean(franco);

          if (pembayaran) {
            editedData.isPaid = pembayaran;
            editedData.paidAt = new Date().toISOString();
          } else {
            editedData.isPaid = pembayaran;
            editedData.paidAt = null;
          }

          if (pengiriman) {
            editedData.isDelivered = pengiriman;
            editedData.deliveredAt = new Date().toISOString();
          } else {
            editedData.isDelivered = pengiriman;
            editedData.deliveredAt = null;
          }

          return editedData;
        } else {
          return nota;
        }
      });

      setDataNota(newData);
    }

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
