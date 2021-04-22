import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalFormNota from '../../components/ModalFormNota/ModalFormNota';
import FormControl from '../../components/Formik/FormControl/FormControl';

import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { addNew } from '../../redux/nota/notaListSlice.js';

import styles from './BuatNota.module.scss';

const BuatNota = ({ history }) => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);

  // Form InitialValues
  const initialValues = {
    namaPengirim: '',
    namaPenerima: '',
    alamatPenerima: '',
  };

  // Form Validation Schema
  const validationSchema = Yup.object({
    namaPengirim: Yup.string().required('Diperlukan'),
    namaPenerima: Yup.string().required('Diperlukan'),
    alamatPenerima: Yup.string().required('Diperlukan'),
  });

  const [dataBarang, setDataBarang] = useState([]);

  const calculateTotalColli = () => {
    if (dataBarang.length > 0) {
      const totalColli = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.banyakColli),
        0
      );

      return totalColli;
    } else {
      return 0;
    }
  };
  const calculateTotalBerat = () => {
    if (dataBarang.length > 0) {
      const totalBerat = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.beratKotor),
        0
      );

      return totalBerat;
    } else {
      return 0;
    }
  };
  const calculateTotalBiaya = () => {
    if (dataBarang.length > 0) {
      const totalBiaya = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.biayaAngkut),
        0
      );

      return totalBiaya;
    } else {
      return;
    }
  };
  const formSubmitHandler = async (values) => {
    const { namaPengirim, namaPenerima, alamatPenerima } = values;

    const newNota = {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang: dataBarang,
      totalColli: calculateTotalColli(),
      totalBerat: calculateTotalBerat(),
      totalHarga: calculateTotalBiaya(),
    };

    const config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const { data } = await axios.post('/api/nota', newNota, config);

      if (data) {
        dispatch(addNew(data));
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
    }

    setDataBarang([]);
  };

  useEffect(() => {
    if (!authToken) {
      history.push('/');
    }
  }, [history, authToken]);

  return (
    <>
      <Header />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='buatNota' />
        </Col>

        <Col className='p-4' md={9}>
          <h1 className={styles.heading1}>Input Nota</h1>

          <Row noGutters>
            <Col xs={12} sm className='px-2'>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={formSubmitHandler}
              >
                {(formik) => {
                  return (
                    <FormikForm>
                      <FormControl
                        control='input'
                        type='text'
                        name='namaPengirim'
                        label='Nama Pengirim'
                        placeholder='Masukkan nama pengirim'
                      />

                      <FormControl
                        control='input'
                        type='text'
                        name='namaPenerima'
                        label='Nama Penerima'
                        placeholder='Masukkan nama penerima'
                      />

                      <FormControl
                        control='input'
                        type='text'
                        name='alamatPenerima'
                        label='Alamat Penerima'
                        placeholder='Masukkan alamat penerima'
                      />

                      <Button
                        type='submit'
                        variant='primary'
                        disabled={!dataBarang.length > 0 || formik.isSubmitting}
                      >
                        Buat Nota
                      </Button>
                    </FormikForm>
                  );
                }}
              </Formik>
            </Col>

            <Col xs={12} sm className='px-2'>
              <Form.Group controlId='totalColli'>
                <Form.Label>Total Colli</Form.Label>
                <Form.Control
                  className='pl-3'
                  type='text'
                  value={`${calculateTotalColli()} Colli`}
                  readOnly
                  plaintext
                />
              </Form.Group>

              <Form.Group controlId='totalBerat'>
                <Form.Label>Total Berat</Form.Label>
                <Form.Control
                  className='pl-3'
                  type='text'
                  value={`${calculateTotalBerat()} Kg`}
                  readOnly
                  plaintext
                />
              </Form.Group>

              <Form.Group controlId='totalBiaya'>
                <Form.Label>Total Biaya</Form.Label>
                <Form.Control
                  className='pl-3'
                  type='text'
                  value={`Rp. ${numeral(calculateTotalBiaya()).format(
                    '0,0.00'
                  )}`}
                  readOnly
                  plaintext
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className='mt-3' noGutters>
            <Col>
              <div className='d-flex justify-content-between'>
                <h2 className={`${styles.heading2} mb-2`}>Data Barang</h2>
                <ModalFormNota
                  dataBarang={dataBarang}
                  setDataBarang={setDataBarang}
                />
              </div>

              {dataBarang.length > 0 ? (
                <Table striped bordered hover responsive='md'>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Banyak Colli</th>
                      <th>Macam Colli</th>
                      <th>Merek Colli</th>
                      <th>Nama Barang</th>
                      <th>Berat Kotor</th>
                      <th>Biaya Angkut</th>
                      <th>Keterangan</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBarang.map((barang) => (
                      <tr key={barang.noBarang}>
                        <td>{barang.noBarang}</td>
                        <td>{barang.banyakColli}</td>
                        <td>{barang.macamColli}</td>
                        <td>{barang.merekColli}</td>
                        <td>{barang.namaBarang}</td>
                        <td>{barang.beratKotor}</td>
                        <td>{barang.biayaAngkut}</td>
                        <td>{barang.keterangan}</td>
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
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Message>
                  Belum ada barang yang ditambahkan kedalam list
                </Message>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BuatNota;
