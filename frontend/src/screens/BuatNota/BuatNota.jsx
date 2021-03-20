import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalFormNota from '../../components/ModalFormNota/ModalFormNota';

// import styles from './BuatNota.module.scss';

const BuatNota = ({ history }) => {
  const dispatch = useDispatch();

  // Form 1 - Rincian Pengiriman
  const [namaPengirim, setNamaPengirim] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamatPenerima, setAlamatPenerima] = useState('');
  const [dataBarang, setDataBarang] = useState([]);

  // Dont need to put in state(can be derived from existing value)
  const [totalColli, setTotalColli] = useState('0 Colli');
  const [totalBerat, setTotalBerat] = useState('0 Kg');
  const [totalBiaya, setTotalBiaya] = useState('Rp. 0');

  useEffect(() => {
    if (false) {
      history.push('/');
    }
  }, [history]);

  return (
    <>
      <Header />

      <Row className='h-100' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='buatNota' />
        </Col>

        <Col className='p-4' md={9}>
          <h1 className=''>Input Nota</h1>
          <Form>
            <Row noGutters>
              <Col className='px-2'>
                <Form.Group controlId='namaPengirim'>
                  <Form.Label>Nama Pengirim</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama pengirim'
                    value={namaPengirim}
                    onChange={(e) => setNamaPengirim(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId='namaPenerima'>
                  <Form.Label>Nama Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value={namaPenerima}
                    onChange={(e) => setNamaPenerima(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId='alamatPenerima'>
                  <Form.Label>Alamat Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan alamat penerima'
                    value={alamatPenerima}
                    onChange={(e) => setAlamatPenerima(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col className='px-2'>
                <Form.Group controlId='totalColli'>
                  <Form.Label>Total Colli</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={totalColli}
                    readOnly
                    plaintext
                  />
                </Form.Group>

                <Form.Group controlId='totalBerat'>
                  <Form.Label>Total Berat</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={totalBerat}
                    readOnly
                    plaintext
                  />
                </Form.Group>

                <Form.Group controlId='totalBiaya'>
                  <Form.Label>Total Biaya</Form.Label>
                  <Form.Control
                    className='pl-3'
                    type='text'
                    value={totalBiaya}
                    readOnly
                    plaintext
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Row className='mt-3' noGutters>
            <Col>
              <div className='d-flex justify-content-between'>
                <h2 className='mb-2'>Data Barang</h2>
                <ModalFormNota
                  dataBarang={dataBarang}
                  setDataBarang={setDataBarang}
                />
              </div>

              <Table striped bordered hover>
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
                  {dataBarang.map((barang) => (
                    <tr>
                      <td>{barang.noBarang}</td>
                      <td>{barang.banyakColli}</td>
                      <td>{barang.macamColli}</td>
                      <td>{barang.merekColli}</td>
                      <td>{barang.namaBarang}</td>
                      <td>{barang.beratKotor}</td>
                      <td>{barang.biayaAngkut}</td>
                      <td>{barang.keterangan}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default BuatNota;
