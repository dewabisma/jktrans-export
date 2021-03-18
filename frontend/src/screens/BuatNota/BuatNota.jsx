import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Form, Table } from 'react-bootstrap';
import useFetch from '../../hooks/useFetch.js';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

// import styles from './BuatNota.module.scss';

const BuatNota = ({ history }) => {
  const dispatch = useDispatch();

  const {
    data: listBiaya,
    error: errorListBiaya,
    isLoading: loadingListBiaya,
  } = useFetch('/api/prices');

  // Form 1 - Rincian Pengiriman
  const [namaPengirim, setNamaPengirim] = useState('');
  const [namaPenerima, setNamaPenerima] = useState('');
  const [alamatPenerima, setAlamatPenerima] = useState('');
  const [dataBarang, setDataBarang] = useState([]);
  const [totalColli, setTotalColli] = useState(0);
  const [totalBerat, setTotalBerat] = useState(0);
  const [totalHarga, setTotalHarga] = useState(0);

  // Form 2 - Data Barang Dikirim
  const [banyakColli, setBanyakColli] = useState(0);
  const [macamColli, setMacamColli] = useState('');
  const [merekColli, setMerekColli] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [beratKotor, setBeratKotor] = useState(0);
  const [biayaAngkut, setBiayaAngkut] = useState(0);
  const [keterangan, setKeterangan] = useState('');

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

          <Row noGutters>
            <Col>
              <Form>
                <Form.Group controlId='namaPengirim'>
                  <Form.Label>Nama Pengirim</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama pengirim'
                    value={namaPenerima}
                    onChange={(e) => setNamaPenerima(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId='namaPenerima'>
                  <Form.Label>Nama Penerima</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    required
                  />
                </Form.Group>

                <Form.Group controlId='alamatPenerima'>
                  <Form.Label>Alamat Penerima</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Masukkan alamat penerima'
                    required
                  />
                </Form.Group>

                <Button variant='primary' type='submit'>
                  Buat Nota
                </Button>
              </Form>
            </Col>
          </Row>

          <Row className='mt-3' noGutters>
            <Col>
              <h2>Data Barang</h2>

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
                  <tr>
                    <td>1</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>1234</td>
                    <td>1234</td>
                  </tr>
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