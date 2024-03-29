import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';
import { Row, Col, Table, Container } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';

import { COLUMN_NOTA } from './columns.js';
import {
  selectRekapanById,
  selectRekapan,
  fetchAllRekapan,
} from '../../redux/rekapan/rekapanListSlice.js';
import { selectAuthToken } from '../../redux/user/userLoginSlice';
import styles from './CetakRekapan.module.scss';

const CetakNota = ({ history, match }) => {
  const { rekapanId } = match.params;
  const dispatch = useDispatch();

  const dateNow = new Date().toISOString();
  const todayDate = format(parseISO(dateNow), 'dd/MM/yyyy');

  const authToken = useSelector(selectAuthToken);

  const { status: rekapanStatus } = useSelector(selectRekapan);
  let dataRekapan = useSelector((state) => selectRekapanById(state, rekapanId));

  if (!dataRekapan) {
    dataRekapan = {
      noRekapan: '',
      sopirPengirim: '',
      noPolis: '',
      detailRekapanNota: [],
    };
  }

  const { noRekapan, sopirPengirim, noPolis, detailRekapanNota } = dataRekapan;

  const columnsNota = useMemo(() => COLUMN_NOTA, []);
  const dataNota = useMemo(() => detailRekapanNota, [detailRekapanNota]);
  const tableNota = useTable({
    columns: columnsNota,
    data: dataNota,
  });

  useEffect(() => {
    if (!authToken) {
      history.replace(`/?redirect=rekapan/${rekapanId}/cetak`);
    }

    if (authToken && rekapanStatus === 'idle') {
      dispatch(fetchAllRekapan());
    }
  }, [history, authToken, rekapanId, dispatch, rekapanStatus]);

  return (
    <Container>
      <Row className='pt-5'>
        <Col className='text-left'>
          <h1>JKTRANS</h1>
          <h3>Indonesia, Bali & Surabaya</h3>
          <p>WA: 081-234-567-890</p>
          <p>WA: 081-234-567-890</p>
        </Col>

        <Col className='text-right'>
          <h3>
            <strong>Nomor Rekapan:</strong> {noRekapan}
          </h3>
          <h3>
            <strong>Sopir:</strong> {sopirPengirim}
          </h3>
          <h3>
            <strong>Nomor Polisi:</strong> {noPolis}
          </h3>
        </Col>
      </Row>

      <div className='dropdown-divider'></div>

      <Row>
        <Col>
          <Table striped bordered hover {...tableNota.getTableProps()}>
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

      <Row className='align-items-end'>
        <Col>
          <p>Tanga Tangan Sopir</p>

          <div className={styles.tandaTangan}>...................</div>
        </Col>
        <Col className='text-right'>
          <p>Denpasar, {todayDate}</p>

          <div className={styles.tandaTangan}>...................</div>
        </Col>
      </Row>
    </Container>
  );
};

export default CetakNota;
