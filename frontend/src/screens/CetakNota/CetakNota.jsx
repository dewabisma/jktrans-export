import React, { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Row, Col, Table, Container } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import numeral from 'numeral';

import {
  selectNotaById,
  fetchAllNota,
  selectNota,
} from '../../redux/nota/notaListSlice.js';
import { selectAuthToken } from '../../redux/user/userLoginSlice';
import { COLUMN_BARANG } from './columns.js';
import styles from './CetakNota.module.scss';

const CetakNota = ({ match, history }) => {
  const { notaId } = match.params;
  const dispatch = useDispatch();

  const dateNow = parseISO(new Date().toISOString());
  const todayDate = format(dateNow, 'dd/MM/yyyy');

  const authToken = useSelector(selectAuthToken);
  const { status: notaStatus } = useSelector(selectNota);
  let dataNota = useSelector((state) => selectNotaById(state, notaId));

  if (!dataNota) {
    dataNota = {
      noNota: '',
      namaPengirim: '',
      namaPenerima: '',
      alamatPenerima: '',
      detailBarang: [],
      totalColli: '',
      totalBerat: '',
      totalHarga: '',
    };
  }

  const {
    noNota,
    namaPengirim,
    namaPenerima,
    alamatPenerima,
    detailBarang,
    totalColli,
    totalBerat,
    totalHarga,
  } = dataNota;

  const columnsBarang = useMemo(() => COLUMN_BARANG, []);
  const dataBarang = useMemo(() => detailBarang, [detailBarang]);
  const tableBarang = useTable({
    columns: columnsBarang,
    data: dataBarang,
  });

  useEffect(() => {
    if (!authToken) {
      history.replace(`/?redirect=nota/${notaId}/cetak`);
    }

    if (authToken && notaStatus === 'idle') dispatch(fetchAllNota());
  }, [history, authToken, notaId, notaStatus, dispatch]);

  return (
    <Container>
      <Row className='pt-5'>
        <Col className='d-flex flex-column'>
          <h1>JKTRANS</h1>
          <h4>Indonesia, Bali & Surabaya</h4>
          <p>WA: 081-234-567-890</p>
          <p>WA: 081-234-567-890</p>
        </Col>

        <Col className='d-flex flex-column justify-content-end'>
          <h4 className={styles.h4}>
            <strong>Penerima:</strong> {namaPenerima}
          </h4>
          <h4 className={styles.h4}>
            <strong>Alamat Penerima:</strong> {alamatPenerima}
          </h4>
        </Col>
      </Row>

      <div className='dropdown-divider'></div>

      <Row className='align-items-end'>
        <Col>
          <h2>Data Pengirim</h2>
          <p>
            <strong>Nama:</strong> {namaPengirim}
          </p>
          <p className='text-muted'>Surabaya, Denpasar</p>
        </Col>
        <Col className='text-right'>
          <p>
            <strong>Tanggal:</strong> {todayDate}
          </p>
          <p>
            <strong>No Nota:</strong> {noNota}
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover {...tableBarang.getTableProps()}>
            <thead>
              {tableBarang.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <td {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </td>
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
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className='dropdown-divider'></div>

          <div className='d-flex align-items-center'>
            <Table bordered className='mt-2 w30'>
              <tbody>
                <tr>
                  <td>
                    <strong>Total Colli</strong>
                  </td>
                  <td>{`${totalColli} Colli`}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Total Berat</strong>
                  </td>
                  <td>{`${totalBerat} Kg`}</td>
                </tr>

                <tr>
                  <td>
                    <strong>Total Biaya</strong>
                  </td>
                  <td>{`Rp. ${numeral(totalHarga).format('0,0')}`}</td>
                </tr>
              </tbody>
            </Table>

            <Col className='ml-5'>
              <p>Tanga Tangan Sopir</p>

              <div className={styles.tandaTangan}>...................</div>
            </Col>
            <Col className='text-right'>
              <p>Denpasar, {todayDate}</p>

              <div className={styles.tandaTangan}>...................</div>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CetakNota;
