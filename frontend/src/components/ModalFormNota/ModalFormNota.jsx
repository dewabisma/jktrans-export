import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import numeral from 'numeral';
import useFetch from '../../hooks/useFetch.js';

import FormControl from '../Formik/FormControl/FormControl';
import Message from '../Message/Message';

const ModalFormNota = ({ dataBarang, setDataBarang }) => {
  const [show, setShow] = useState(false);

  const { data: listBiaya, error: errorListBiaya } = useFetch('/api/prices');

  // Formik Form Initial Values
  const initialValues = {
    banyakColli: 0,
    macamColli: '',
    merekColli: '',
    namaBarang: '',
    beratKotor: 0,
    keterangan: '',
  };

  // Yup Validation Schema
  const validationSchema = Yup.object({
    banyakColli: Yup.number()
      .moreThan(0, 'Jumlah tidak valid')
      .required('Diperlukan'),
    macamColli: Yup.string().required('Diperlukan'),
    merekColli: Yup.string().required('Diperlukan'),
    namaBarang: Yup.string().required('Diperlukan'),
    beratKotor: Yup.number()
      .moreThan(0, 'Jumlah tidak valid')
      .required('Diperlukan'),
    keterangan: Yup.string().required('Diperlukan'),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Cache expensive calculation
  const cachedBiayaAngkut = {
    banyakColli: 0,
    macamColli: '',
    biayaAngkut: 0,
    createdAt: new Date(),
  };

  // Derive value if possible rather than store in state (will not sync if not derived)
  const hitungBiayaAngkut = (banyakColli, macamColli) => {
    if (banyakColli !== 0 && macamColli) {
      if (
        banyakColli === cachedBiayaAngkut.banyakColli &&
        macamColli === cachedBiayaAngkut.macamColli
      ) {
        return cachedBiayaAngkut.biayaAngkut;
      }

      const barang = listBiaya.find(
        (barang) => barang.jenisBarang === macamColli
      );

      if (barang) {
        const biayaPerColli = barang.biayaAngkut;

        return banyakColli * biayaPerColli;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  // Form Submit Handler
  const formHandler = (values) => {
    const {
      banyakColli,
      macamColli,
      merekColli,
      namaBarang,
      beratKotor,
      keterangan,
    } = values;

    const newBarang = {
      noBarang: dataBarang.length + 1,
      banyakColli,
      macamColli,
      merekColli,
      namaBarang,
      beratKotor,
      biayaAngkut: hitungBiayaAngkut(banyakColli, macamColli),
      keterangan,
    };

    setDataBarang([...dataBarang, newBarang]);

    handleClose();
  };

  return (
    <>
      <Button
        className='mb-2'
        variant='outline-primary'
        type='button'
        onClick={handleShow}
      >
        Tambah Barang
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
        className='pl-0'
      >
        <Modal.Header closeButton>
          <Modal.Title>Input Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={formHandler}
          >
            {(formik) => {
              return (
                <FormikForm>
                  <FormControl
                    control='input'
                    type='number'
                    name='banyakColli'
                    label='Banyak Colli'
                    placeholder='Masukkan banyak colli'
                  />

                  <FormControl
                    control='select'
                    options={[
                      { id: 'pilih', jenisBarang: 'Pilih Macam Colli' },
                      ...listBiaya,
                    ]}
                    name='macamColli'
                    label='Macam Colli'
                  />
                  {errorListBiaya && (
                    <Message variant='danger'>{errorListBiaya}</Message>
                  )}

                  <FormControl
                    control='input'
                    type='text'
                    name='merekColli'
                    label='Merek Colli'
                    placeholder='Masukkan merek colli'
                  />

                  <FormControl
                    control='input'
                    type='text'
                    name='namaBarang'
                    label='Nama Barang'
                    placeholder='Masukkan nama barang'
                  />

                  <FormControl
                    control='input'
                    type='number'
                    name='beratKotor'
                    label='Berat Kotor'
                    placeholder='Masukkan berat kotor'
                  />

                  <Form.Group controlId='biayaAngkut'>
                    <Form.Label>Biaya Angkut</Form.Label>

                    <Form.Control
                      className='pl-3'
                      plaintext
                      readOnly
                      type='text'
                      value={`Rp. ${numeral(
                        hitungBiayaAngkut(
                          formik.values.banyakColli,
                          formik.values.macamColli
                        )
                      ).format('0,0.00')}`}
                      required
                    ></Form.Control>
                  </Form.Group>

                  <FormControl
                    control='input'
                    type='text'
                    name='keterangan'
                    label='Keterangan'
                    placeholder='Masukkan keterangan'
                  />

                  <Button
                    className='float-right'
                    variant='primary'
                    type='submit'
                  >
                    Tambah
                  </Button>
                </FormikForm>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalFormNota;
