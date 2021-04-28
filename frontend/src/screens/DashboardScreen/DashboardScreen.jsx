import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Row, Col, Table, Card, Button } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

import styles from './DashboardScreen.module.scss';

import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import {
  fetchAllRekapan,
  selectRekapan,
} from '../../redux/rekapan/rekapanListSlice.js';
import { fetchAllNota, selectNota } from '../../redux/nota/notaListSlice.js';
import {
  fetchAllBookingan,
  selectBookingan,
} from '../../redux/bookingan/bookinganListSlice.js';

import { COLUMN_NOTA, COLUMN_REKAPAN } from './columns.js';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);

  const {
    error: errorRekapan,
    status: rekapanStatus,
    totalRekapan,
    entities: dataRekapan,
  } = useSelector(selectRekapan);

  const {
    error: errorNota,
    status: notaStatus,
    totalNota,
    entities: dataNota,
  } = useSelector(selectNota);

  const {
    error: errorBookingan,
    status: bookinganStatus,
    totalBookingan,
    entities: dataBookingan,
  } = useSelector(selectBookingan);

  const notaColumns = useMemo(() => COLUMN_NOTA, []);
  const notaData = useMemo(() => dataNota, [dataNota]);

  const tableNota = useTable({
    columns: notaColumns,
    data: notaData,
  });

  const rekapanColumns = useMemo(() => COLUMN_REKAPAN, []);
  const rekapanData = useMemo(() => dataRekapan, [dataRekapan]);

  const tableRekapan = useTable({
    columns: rekapanColumns,
    data: rekapanData,
  });

  const getTotalTransaction = () =>
    totalRekapan + totalNota + dataBookingan.length;

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (authToken && rekapanStatus === 'idle') dispatch(fetchAllRekapan());
    if (authToken && notaStatus === 'idle') dispatch(fetchAllNota());
    if (authToken && bookinganStatus === 'idle') dispatch(fetchAllBookingan());
  }, [
    authToken,
    history,
    dispatch,
    notaStatus,
    rekapanStatus,
    bookinganStatus,
  ]);

  return (
    <>
      <Header />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='dashboard' />
        </Col>

        <Col className='p-4' md={9}>
          <Row noGutters>
            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mr-sm-2 mb-sm-2 mr-md-0'>
                <Card.Body>
                  <Card.Title>Nota Terinput</Card.Title>
                  {errorNota && <Message variant='danger'>{errorNota}</Message>}

                  {notaStatus === 'loading' && <Loader />}

                  {totalNota ? (
                    <Card.Text>{totalNota}</Card.Text>
                  ) : (
                    <Card.Text>-</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 mt-sm-0 ml-sm-2 mb-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Rekapan Terinput</Card.Title>
                  {errorRekapan && (
                    <Message variant='danger'>{errorRekapan}</Message>
                  )}

                  {rekapanStatus === 'loading' && <Loader />}

                  {totalRekapan ? (
                    <Card.Text>{totalRekapan}</Card.Text>
                  ) : (
                    <Card.Text>-</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 mt-sm-2 mr-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Bookingan Masuk</Card.Title>
                  {errorBookingan && (
                    <Message variant='danger'>{errorBookingan}</Message>
                  )}

                  {bookinganStatus === 'loading' && <Loader />}

                  {bookinganStatus === 'success' && (
                    <Card.Text>{dataBookingan.length}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 ml-sm-2 mt-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Total Transaksi</Card.Title>
                  {dataNota && dataRekapan && dataBookingan ? (
                    <Card.Text>{getTotalTransaction()}</Card.Text>
                  ) : (
                    <Card.Text>-</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className='pt-4' noGutters>
            <Col className='p-2 bg-light shadow '>
              {errorNota && <Message variant='danger'>{errorNota}</Message>}
              {notaStatus === 'loading' && <Loader />}
              {notaStatus === 'success' && (
                <Table responsive {...tableNota.getTableProps()}>
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

                  <tbody
                    className={styles.table}
                    {...tableNota.getTableBodyProps()}
                  >
                    {tableNota.rows.map((row) => {
                      tableNota.prepareRow(row);

                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>

          <Row className='pt-4' noGutters>
            <Col className='p-2 bg-light shadow '>
              {errorRekapan && (
                <Message variant='danger'>{errorRekapan}</Message>
              )}
              {rekapanStatus === 'loading' && <Loader />}
              {rekapanStatus === 'success' && (
                <Table responsive {...tableRekapan.getTableProps()}>
                  <thead>
                    {tableRekapan.headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>

                  <tbody
                    className={styles.table}
                    {...tableRekapan.getTableBodyProps()}
                  >
                    {tableRekapan.rows.map((row) => {
                      tableRekapan.prepareRow(row);

                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
