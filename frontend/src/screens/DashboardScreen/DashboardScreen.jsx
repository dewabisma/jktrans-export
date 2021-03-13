import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table, ListGroup, Card, Button } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch.js';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';

import styles from './DashboardScreen.module.scss';
import { logout, selectAuthToken } from '../../redux/user/userLoginSlice.js';
import {
  fetchAllRekapan,
  selectRekapan,
} from '../../redux/rekapan/rekapanListSlice.js';
import { fetchAllNota, selectNota } from '../../redux/nota/notaListSlice.js';

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const authToken = useSelector(selectAuthToken);

  const {
    error: errorRekapan,
    status: rekapanStatus,
    entities: dataRekapan,
    totalRekapan,
  } = useSelector(selectRekapan);

  const {
    error: errorNota,
    status: notaStatus,
    entities: dataNota,
    totalNota,
  } = useSelector(selectNota);

  const {
    data: dataBookings,
    error: errorBookings,
    isLoading: loadingBookings,
  } = useFetch('/api/bookings', authToken);

  const getTotalTransaction = () =>
    dataRekapan.allRekapan.length +
    dataNota.allNota.length +
    dataBookings.allBookings.length;

  const checkNotaHandler = (notaId) => {};
  const checkRekapanHandler = (rekapanId) => {};
  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (rekapanStatus === 'idle') dispatch(fetchAllRekapan);
    if (notaStatus === 'idle') dispatch(fetchAllNota);
  }, [authToken, history, rekapanStatus, dispatch, notaStatus]);

  return (
    <>
      <Header />

      <Row noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item variant='primary' action>
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item variant='primary' action>
              Buat Nota
            </ListGroup.Item>
            <ListGroup.Item variant='primary' action>
              Buat Rekapan
            </ListGroup.Item>
            <ListGroup.Item variant='primary' action>
              Lihat Data Nota
            </ListGroup.Item>
            <ListGroup.Item variant='primary' action>
              Lihat Data Rekapan
            </ListGroup.Item>
          </ListGroup>

          <div className='d-flex justify-content-center mt-3'>
            <Button className='w-50' onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </Col>

        <Col className='p-4' md={9}>
          <Row noGutters>
            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mr-sm-2 mb-sm-2 mr-md-0'>
                <Card.Body>
                  <Card.Title>Nota Terinput</Card.Title>
                  {errorNota && <Message variant='danger'>{errorNota}</Message>}

                  {notaStatus === 'loading' && <Loader />}

                  {totalNota && <Card.Text>{totalNota}</Card.Text>}
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

                  {totalRekapan && <Card.Text>{totalRekapan}</Card.Text>}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 mt-sm-2 mr-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Bookingan Masuk</Card.Title>
                  {errorBookings && (
                    <Message variant='danger'>{errorBookings}</Message>
                  )}

                  {loadingBookings && <Loader />}

                  {dataBookings && (
                    <Card.Text>{dataBookings.allBookings.length}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 ml-sm-2 mt-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Total Transaksi</Card.Title>
                  {dataNota && dataRekapan && dataBookings && (
                    <Card.Text>{getTotalTransaction()}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className='pt-4' noGutters>
            <Col className='p-2 bg-light shadow '>
              {errorNota && <Message variant='danger'>{errorNota}</Message>}
              {notaStatus === 'loading' && <Loader />}
              {dataNota && (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Sp Nota</th>
                      <th>Nama Pengirim</th>
                      <th>Alamat Tujuan</th>
                      <th>Toko Tujuan</th>
                      <th>Penginput</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className={styles.table}>
                    {dataNota.allNota.map((nota) => (
                      <tr key={nota.noNota}>
                        <td>{nota.noNota}</td>
                        <td>{nota.namaPengirim}</td>
                        <td>{nota.alamatPenerima}</td>
                        <td>{nota.namaPenerima}</td>
                        <td>{nota.pegawai.username}</td>
                        <td>
                          <Button
                            onClick={checkNotaHandler(nota._id)}
                            size='sm'
                          >
                            Check
                          </Button>
                        </td>
                      </tr>
                    ))}
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
              {dataRekapan && (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>No Rekapan</th>
                      <th>No Polis</th>
                      <th>Sopir</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody className={styles.table}>
                    {dataRekapan.allRekapan.map((rekapan) => (
                      <tr key={rekapan.noRekapan}>
                        <td>{rekapan.noRekapan}</td>
                        <td>{rekapan.noPolis}</td>
                        <td>{rekapan.sopirPengirim}</td>
                        <td>
                          <Button
                            onClick={checkRekapanHandler(rekapan._id)}
                            size='sm'
                          >
                            Check
                          </Button>
                        </td>
                      </tr>
                    ))}
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
