import React, { useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';

const DetailRekapan = () => {
  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-2'>Rekapan - 12343</h1>

            <Button type='button' variant='secondary'>
              <FontAwesomeIcon icon={faEdit} size='2x' />
            </Button>
          </div>

          <Form>
            <Row noGutters>
              <Col xs={12} sm className='px-2'>
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

          <h2>Data Barang</h2>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Banyak Colli</th>
                <th>Macam Colli</th>
                <th>Merek Colli</th>
                <th>Nama Barang</th>
                <th>Berat Kotor</th>
                <th>Biaya Angkut</th>
                {/* bagian keterangan dibagi jadi apakah sudah dibayar dan apakah sudah sampai( diterima )*/}
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>siap dikirim</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>siap dikirim</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>siap dikirim</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row noGutters>
        <Col></Col>
      </Row>
    </>
  );
};

export default DetailRekapan;
