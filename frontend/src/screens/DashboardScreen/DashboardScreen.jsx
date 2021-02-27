import React, { useEffect, useState } from 'react';
import { Row, Col, Table, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';

import Header from '../../components/Header/Header';

import styles from './DashboardScreen.module.scss';

const DashboardScreen = () => {
  const [listNota, setListNota] = useState([]);
  const [listRekapan, setListRekapan] = useState([]);

  const checkNotaHandler = (notaId) => {};

  const checkRekapanHandler = (rekapanId) => {};

  useEffect(() => {
    (async () => {
      try {
        const config = {
          headers: {
            authorization: 'Bearer ',
          },
        };
        const { data } = await axios.get('/api/nota', config);

        console.log(data);

        setListNota(data.allNota);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      try {
        const { data } = await axios.get('/api/rekapan');

        setListRekapan(data.allRekapan);
      } catch (error) {
        console.log(error);
      }
    })();
  });

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
            <Button className='w-50'>Logout</Button>
          </div>
        </Col>

        <Col className='p-4' md={9}>
          <Row noGutters>
            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mr-sm-2 mb-sm-2 mr-md-0'>
                <Card.Body>
                  <Card.Title>Nota Terinput</Card.Title>
                  <Card.Text>240</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 mt-sm-0 ml-sm-2 mb-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Rekapan Terinput</Card.Title>
                  <Card.Text>240</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 mt-sm-2 mr-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Bookingan Masuk</Card.Title>
                  <Card.Text>240</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} sm={6} md={3}>
              <Card className='bg-light border-0 shadow mt-2 ml-sm-2 mt-sm-2 m-md-0 ml-md-2'>
                <Card.Body>
                  <Card.Title>Total Transaksi</Card.Title>
                  <Card.Text>240</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className='pt-4' noGutters>
            <Col className='p-2 bg-light shadow '>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Sp</th>
                    <th>Nama Pengirim</th>
                    <th>Alamat Tujuan</th>
                    <th>Toko Tujuan</th>
                    <th>Penginput</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className={styles.table}>
                  {listNota.map((nota) => (
                    <tr key={nota.noNota}>
                      <td>{nota.noNota}</td>
                      <td>{nota.namaPengirim}</td>
                      <td>{nota.alamatPenerima}</td>
                      <td>{nota.namaPenerima}</td>
                      <td>{nota.pegawai.username}</td>
                      <td>
                        <Button onClick={checkNotaHandler(nota._id)} size='sm'>
                          Check
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className='pt-4' noGutters>
            <Col className='p-2 bg-light shadow '>
              <Table responsive>
                <thead>
                  <tr>
                    <th>No Rekapan</th>
                    <th>No Polis</th>
                    <th>Sopi</th>
                    <th>Tujuan</th>
                    <th>Penginput</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className={styles.table}>
                  <tr>
                    <td>no-sp-nota</td>
                    <td>wayan</td>
                    <td>dps</td>
                    <td>gg shop</td>
                    <td>yang nginput</td>
                    <td>
                      <Button size='sm'>Check</Button>
                    </td>
                  </tr>

                  <tr>
                    <td>no-sp-nota</td>
                    <td>wayan</td>
                    <td>dps</td>
                    <td>gg shop</td>
                    <td>yang nginput</td>
                    <td>
                      <Button size='sm'>Check</Button>
                    </td>
                  </tr>

                  <tr>
                    <td>no-sp-nota</td>
                    <td>wayan</td>
                    <td>dps</td>
                    <td>gg shop</td>
                    <td>yang nginput</td>
                    <td>
                      <Button size='sm'>Check</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
