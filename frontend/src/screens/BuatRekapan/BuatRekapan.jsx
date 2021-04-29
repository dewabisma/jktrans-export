import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import FormControl from '../../components/Formik/FormControl/FormControl';

import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { selectAllNota } from '../../redux/nota/notaListSlice.js';
import { addNew } from '../../redux/rekapan/rekapanListSlice.js';

import { COLUMN_NOTA } from './columns.js';
import styles from './BuatRekapan.module.scss';

const BuatRekapan = ({ history }) => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);
  const listNota = useSelector(selectAllNota);

  const [errorBuatRekapan, setErrorBuatRekapan] = useState(null);
  const [kumpulanIdNota, setKumpulanIdNota] = useState([]);

  const notaColumns = useMemo(() => COLUMN_NOTA, []);

  const tableNota = useTable({
    columns: notaColumns,
    data: listNota,
  });

  // Form initial values
  const initialValues = {
    sopirPengirim: '',
    noPolis: '',
  };

  // Form validation schema
  const validationSchema = Yup.object({
    sopirPengirim: Yup.string().required('Diperlukan'),
    noPolis: Yup.string().required('Diperlukan'),
  });

  const checkIfNotaIdExist = (notaId) => {
    const isExist = kumpulanIdNota.find((id) => String(id) === String(notaId));

    if (isExist) {
      return true;
    } else return false;
  };

  const removeNotaIdFromState = (notaId) => {
    const newState = kumpulanIdNota.filter(
      (id) => String(id) !== String(notaId)
    );

    setKumpulanIdNota([...newState]);
  };

  const tambahNotaHandler = (e) => {
    const isExist = checkIfNotaIdExist(e.target.value);

    if (isExist) {
      removeNotaIdFromState(e.target.value);
    } else {
      setKumpulanIdNota([...kumpulanIdNota, e.target.value]);
    }
  };

  const formSubmitHandler = async (values) => {
    const { sopirPengirim, noPolis } = values;

    const newRekapan = {
      sopirPengirim,
      noPolis,
      kumpulanIdNota,
    };

    const config = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const {
        data: { message, createdRekapan },
      } = await axios.post('/api/rekapan', newRekapan, config);

      if (createdRekapan) {
        dispatch(addNew(createdRekapan));
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      setErrorBuatRekapan(message);
    }

    setKumpulanIdNota([]);
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
          <SideMenu history={history} page='buatRekapan' />
        </Col>

        <Col className='p-4' md={9}>
          {errorBuatRekapan && (
            <Message variant='danger'>{errorBuatRekapan}</Message>
          )}
          <h1 className=''>Input Rekapan</h1>

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
                        name='sopirPengirim'
                        label='Nama Sopir Pengirim'
                        placeholder='Masukkan nama sopir pengirim'
                      />

                      <FormControl
                        control='input'
                        type='text'
                        name='noPolis'
                        label='No Polis'
                        placeholder='Masukkan no polis'
                      />

                      <Button
                        type='submit'
                        variant='primary'
                        disabled={
                          !formik.isValid ||
                          !kumpulanIdNota.length > 0 ||
                          formik.isSubmitting
                        }
                      >
                        Buat Rekapan
                      </Button>
                    </FormikForm>
                  );
                }}
              </Formik>
            </Col>

            <Col className='d-none d-md-block px-2'></Col>
          </Row>

          <Row className='mt-3' noGutters>
            <Col>
              <div className='d-flex justify-content-between'>
                <h2 className='mb-2'>List Nota</h2>
              </div>

              <Table
                striped
                bordered
                hover
                responsive
                {...tableNota.getTableProps()}
              >
                <thead>
                  {tableNota.headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...tableNota.getTableBodyProps()}>
                  {tableNota.rows.map((row) => {
                    tableNota.prepareRow(row);

                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render('Cell', { tambahNotaHandler })}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BuatRekapan;
