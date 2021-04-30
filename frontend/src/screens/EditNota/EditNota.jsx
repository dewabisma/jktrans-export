import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import numeral from 'numeral';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import ModalFormNota from '../../components/ModalFormNota/ModalFormNota';
import FormControl from '../../components/Formik/FormControl/FormControl';

import {
  selectNotaById,
  editNotaById,
  selectNota,
} from '../../redux/nota/notaListSlice';
import { COLUMN_BARANG } from './columns.js';

const EditNota = ({ match, history }) => {
  const dispatch = useDispatch();
  const { notaId } = match.params;

  const { error: errorNota, status: statusNota } = useSelector(selectNota);

  const dataNota = useSelector((state) => selectNotaById(state, notaId));
  const {
    noNota,
    namaPengirim,
    namaPenerima,
    alamatPenerima,
    detailBarang,
  } = dataNota;

  const [dataBarang, setDataBarang] = useState(detailBarang);

  // React-Table
  const barangColumns = useMemo(() => COLUMN_BARANG, []);
  const tableBarang = useTable({
    columns: barangColumns,
    data: dataBarang,
  });

  // Formik
  const formikRef = useRef({ isValid: false, isSubmitting: false });

  const initialValues = {
    namaPengirim,
    namaPenerima,
    alamatPenerima,
  };

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

  const deleteBarang = (index) => {
    const updatedData = dataBarang.filter((data, indexData) => {
      return index !== indexData;
    });

    setDataBarang(updatedData);
  };

  const onSubmit = (values) => {
    const { namaPengirim, namaPenerima, alamatPenerima } = values;

    const editedNota = {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang: dataBarang,
      totalColli: calculateTotalColli(),
      totalBerat: calculateTotalBerat(),
      totalHarga: calculateTotalBiaya(),
    };

    const data = {
      notaId,
      editedNota,
    };

    dispatch(editNotaById(data));
  };

  useEffect(() => {
    if (statusNota === 'successUpdating') {
      history.push(`/nota/${notaId}`);
    }
  }, [statusNota, notaId, history]);

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          {errorNota && <Message variant='danger'>{errorNota}</Message>}

          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Nota - S.P. {noNota}</h1>

            <Button
              className='d-flex justify-content-between align-items-center'
              type='submit'
              variant='primary'
              onClick={(e) => formikRef.current.submitForm()}
              disabled={
                !formikRef.current.isValid ||
                !dataBarang.length > 0 ||
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
            <Col xs={12} sm className='px-2'>
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

          <Row noGutters className='justify-content-between'>
            <h2 className='fs-xs-1-5'>Data Barang</h2>
            <ModalFormNota
              dataBarang={dataBarang}
              setDataBarang={setDataBarang}
            />
          </Row>

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
        </Col>
      </Row>
    </>
  );
};

export default EditNota;
