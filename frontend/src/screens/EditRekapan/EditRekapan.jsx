import React, { useState, useRef } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import Header from '../../components/Header/Header';
import ModalTambahRekapanNota from '../../components/ModalTambahRekapanNota/ModalTambahRekapanNota';
import ModalStatusNota from '../../components/ModalStatusNota/ModalStatusNota';
import FormControl from '../../components/Formik/FormControl/FormControl';

import styles from './EditRekapan.module.scss';

const EditRekapan = () => {
  const [dataNota, setDataNota] = useState([]);

  const formikRef = useRef({ isValid: false });

  const initialValues = {
    namaSopir: 'wyan gede',
    nomorPolisi: '817-KBD',
  };

  const validationSchema = Yup.object({
    namaSopir: Yup.string().required('Diperlukan'),
    nomorPolisi: Yup.string().required('Diperlukan'),
  });

  const onSubmit = () => {
    alert('wroking');
  };

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Rekapan - 12343</h1>

            <Button
              type='submit'
              variant='primary'
              onClick={(e) => formikRef.current.submitForm()}
              disabled={
                !formikRef.current.isValid ||
                !dataNota.length > 0 ||
                formikRef.current.isSubmitting
              }
            >
              <FontAwesomeIcon icon={faSave} size='2x' />

              <span className='font-weight-bold ml-2 d-none d-sm-inline'>
                Simpan
              </span>
            </Button>
          </div>

          <Row noGutters>
            <Col xs={12} sm={4} className='px-2'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  formikRef.current = formik;
                  return (
                    <FormikForm>
                      <FormControl
                        control='input'
                        type='text'
                        name='namaSopir'
                        label='Nama Sopir'
                        placeholder='Masukkan nama sopir'
                      />
                      <FormControl
                        control='input'
                        type='text'
                        name='nomorPolisi'
                        label='Nomor Polisi'
                        placeholder='Masukkan nomor polisi'
                      />
                    </FormikForm>
                  );
                }}
              </Formik>
            </Col>
          </Row>

          <Row noGutters className='justify-content-between'>
            <h2 className='fs-xs-1-5'>Data Nota</h2>

            <ModalTambahRekapanNota
              dataNota={dataNota}
              setDataNota={setDataNota}
            />
          </Row>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>S.P.</th>
                <th>Colli</th>
                <th>Berat</th>
                <th>Franco</th>
                <th>Confrankert</th>
                <th>Penerima</th>
                <th className='w-10'>Keterangan Pembayaran</th>
                <th className='w-10'>Keterangan Pengiriman</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <ModalStatusNota />

                    <Button variant='link'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        aria-roledescription='clicking this element to edit selected nota'
                        className='text-secondary'
                      />
                    </Button>

                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        aria-roledescription='clicking this element to edit selected nota'
                        className='text-secondary'
                      />
                    </Button>

                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default EditRekapan;
