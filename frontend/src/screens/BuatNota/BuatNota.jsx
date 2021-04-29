import React, { useEffect, useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import numeral from 'numeral';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalFormNota from '../../components/ModalFormNota/ModalFormNota';
import FormControl from '../../components/Formik/FormControl/FormControl';

import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { addNew } from '../../redux/nota/notaListSlice.js';

import { COLUMN_BARANG } from './columns.js';
import styles from './BuatNota.module.scss';

const BuatNota = ({ history }) => {
  const dispatch = useDispatch();

  const [errorBuatNota, setErrorBuatNota] = useState(null);
  const [dataBarang, setDataBarang] = useState([]);

  const barangColumns = useMemo(() => COLUMN_BARANG, []);

  const tableBarang = useTable({
    columns: barangColumns,
    data: dataBarang,
  });

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
  const deleteBarang = (indexBarang) => {
    dataBarang.splice(indexBarang, 1);
    setDataBarang([...dataBarang]);
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

      setErrorBuatNota(message);
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
          {errorBuatNota && <Message variant='danger'>{errorBuatNota}</Message>}
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
                        disabled={
                          !dataBarang.length > 0 ||
                          !formik.isValid ||
                          formik.isSubmitting
                        }
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
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  {...tableBarang.getTableProps()}
                >
                  <thead>
                    {tableBarang.headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...tableBarang.getTableBodyProps()}>
                    {tableBarang.rows.map((row) => {
                      tableBarang.prepareRow(row);

                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell', {
                                dataBarang,
                                setDataBarang,
                                deleteBarang,
                              })}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
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
