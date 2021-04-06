import React, { useState } from 'react';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import numeral from 'numeral';

import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const DetailNota = () => {
  const [dataBarang, setDataBarang] = useState([]);

  const calculateTotalColli = () => {
    if (dataBarang.length > 0) {
      const totalColli = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.banyakColli),
        0
      );

      return totalColli;
    } else {
      return 0;
    }
  };
  const calculateTotalBerat = () => {
    if (dataBarang.length > 0) {
      const totalBerat = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.beratKotor),
        0
      );

      return totalBerat;
    } else {
      return 0;
    }
  };
  const calculateTotalBiaya = () => {
    if (dataBarang.length > 0) {
      const totalBiaya = dataBarang.reduce(
        (acc, barang) => Number(acc) + Number(barang.biayaAngkut),
        0
      );

      return totalBiaya;
    } else {
      return;
    }
  };

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-2'>Nota - S.P. 12343</h1>

            <Button type='button' variant='secondary'>
              <FontAwesomeIcon icon={faEdit} size='2x' />
            </Button>
          </div>

          <Form>
            <Row noGutters>
              <Col xs={12} sm className='px-2'>
                <Form.Group controlId='namaPengirim'>
                  <Form.Label>Nama Pengirim</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama pengirim'
                    value='Gede nengah'
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='namaPenerima'>
                  <Form.Label>Nama Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value='Wayan gede'
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='alamatPenerima'>
                  <Form.Label>Alamat Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan alamat penerima'
                    value='jalan brigjen ngurah rai'
                    readOnly
                    required
                  />
                </Form.Group>
              </Col>

              <Col xs={12} sm className='px-2'>
                <Form.Group controlId='totalColli'>
                  <Form.Label>Total Colli</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={`${calculateTotalColli()} Colli`}
                    readOnly
                    plaintext
                  />
                </Form.Group>

                <Form.Group controlId='totalBerat'>
                  <Form.Label>Total Berat</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={`${calculateTotalBerat()} Kg`}
                    readOnly
                    plaintext
                  />
                </Form.Group>

                <Form.Group controlId='totalBiaya'>
                  <Form.Label>Total Biaya</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={`Rp. ${numeral(calculateTotalBiaya()).format(
                      '0,0.00'
                    )}`}
                    readOnly
                    plaintext
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
                <td>sudah dibayar</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>sudah dibayar</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>sudah dibayar</td>
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

export default DetailNota;
