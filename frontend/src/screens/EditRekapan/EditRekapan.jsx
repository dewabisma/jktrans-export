import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable, usePagination } from 'react-table';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import FormControl from '../../components/Formik/FormControl/FormControl';
import TablePagination from '../../components/TablePagination/TablePagination';

import {
  selectRekapanById,
  selectRekapan,
  editRekapanById,
  resetUpdateRekapanState,
} from '../../redux/rekapan/rekapanListSlice.js';
import { selectAuthToken } from '../../redux/user/userLoginSlice';
import { COLUMN_NOTA } from './columns.js';
import styles from './EditRekapan.module.scss';

const EditRekapan = ({ history, match }) => {
  const { rekapanId } = match.params;
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);

  const { updateStatus, updateError, message } = useSelector(selectRekapan);
  const dataRekapan = useSelector((state) =>
    selectRekapanById(state, rekapanId)
  );
  const { noRekapan, sopirPengirim, noPolis, detailRekapanNota } = dataRekapan;

  const [dataNota, setDataNota] = useState(detailRekapanNota);

  // Formik
  const formikRef = useRef({ isValid: false, isSubmitting: false });

  const initialValues = {
    namaSopir: sopirPengirim,
    nomorPolisi: noPolis,
  };

  const validationSchema = Yup.object({
    namaSopir: Yup.string().required('Diperlukan'),
    nomorPolisi: Yup.string().required('Diperlukan'),
  });

  const changeBeingMade = (currentValue) => {
    const { namaSopir, nomorPolisi, dataNota } = currentValue;
    return (
      sopirPengirim !== namaSopir ||
      noPolis !== nomorPolisi ||
      detailRekapanNota !== dataNota
    );
  };

  const onSubmit = (values) => {
    const { namaSopir, nomorPolisi } = values;

    if (changeBeingMade({ ...values, dataNota })) {
      const updatedRekapan = {
        sopirPengirim: namaSopir,
        noPolis: nomorPolisi,
        detailRekapanNota: dataNota,
      };

      const data = { rekapanId, editedRekapan: updatedRekapan };

      dispatch(editRekapanById(data));
    }
  };

  // React Table
  const notaColumns = useMemo(() => COLUMN_NOTA, []);
  const tableNota = useTable(
    {
      columns: notaColumns,
      data: dataNota,
      initialState: { pageSize: 5 },
    },
    usePagination
  );

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (updateStatus === 'success') {
      alert(message);
      dispatch(resetUpdateRekapanState());

      history.push(`/rekapan/${rekapanId}`);
    }
  }, [dispatch, updateStatus, history, rekapanId, message, authToken]);

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          {updateError && <Message variant='danger'>{updateError}</Message>}

          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Rekapan - {noRekapan}</h1>

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
          </Row>

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
              {tableNota.page.map((row) => {
                tableNota.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell', { dataNota, setDataNota })}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <TablePagination tableProps={tableNota} />
        </Col>
      </Row>
    </>
  );
};

export default EditRekapan;
