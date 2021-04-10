import React, { useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';

const DetailRekapan = () => {
  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Rekapan - 12343</h1>

            <Button type='button' variant='secondary'>
              <FontAwesomeIcon icon={faEdit} size='2x' />
            </Button>
          </div>

          <Form>
            <Row noGutters>
              <Col xs={12} sm={4} className='px-2'>
                <Form.Group controlId='namaPengirim'>
                  <Form.Label>Nama Sopir</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama pengirim'
                    value='Gede nengah'
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='nomorPolisi'>
                  <Form.Label>Nomor Polisi</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value='12D-h91'
                    readOnly
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <h2 className='fs-xs-1-5'>Data Nota</h2>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>S.P.</th>
                <th>Colli</th>
                <th>Berat</th>
                <th>Franco</th>
                <th>Confrankert</th>
                <th>Penerima</th>
                {/* bagian keterangan dibagi jadi apakah sudah dibayar dan apakah sudah sampai( diterima )*/}
                <th>Keterangan Pembayaran</th>
                <th>Keterangan Pengiriman</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>12-AB5J</td>
                <td>1234 Colli</td>
                <td>1234 Kg</td>
                <td>
                  <FontAwesomeIcon icon={faCheck} />
                </td>
                <td>Rp. 123,123,123.00</td>
                <td>Wayan</td>
                <td>Belum dibayar</td>
                <td>Sudah diterima</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default DetailRekapan;
