import React, { useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Row, Col, Table, Container } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { selectNotaById } from '../../redux/nota/notaListSlice.js';
import { COLUMN_BARANG } from './columns.js';
import styles from './CetakNota.module.scss';

const CetakNota = ({ match }) => {
  const { notaId } = match.params;
  const dateNow = parseISO(new Date().toISOString());
  const todayDate = format(dateNow, 'dd/MM/yyyy');

  const dataNota = useSelector((state) => selectNotaById(state, notaId));
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

  useEffect(() => {}, []);

  return (
    <Container>
      <Row>
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
        </Col>
      </Row>
    </Container>
  );
};

export default CetakNota;
