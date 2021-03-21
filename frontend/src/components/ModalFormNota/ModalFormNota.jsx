import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import numeral from 'numeral';
import useFetch from '../../hooks/useFetch.js';

import Message from '../Message/Message';

const ModalFormNota = ({ dataBarang, setDataBarang }) => {
  const [show, setShow] = useState(false);

  const { data: listBiaya, error: errorListBiaya } = useFetch('/api/prices');

  // Form 2 - Data Barang Dikirim
  const [banyakColli, setBanyakColli] = useState(0);
  const [macamColli, setMacamColli] = useState('');
  const [merekColli, setMerekColli] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [beratKotor, setBeratKotor] = useState(0);
  const [keterangan, setKeterangan] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Derive value if possible rather than store in state (will not sync if not derived)
  const hitungBiayaAngkut = () => {
    if (banyakColli !== 0 && macamColli) {
      const barang = listBiaya.find(
        (barang) => barang.jenisBarang === macamColli
      );

      if (barang) {
        const biayaPerColli = barang.biayaAngkut;

        return banyakColli * biayaPerColli;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  const resetState = () => {
    setBanyakColli(0);
    setMacamColli('');
    setMerekColli('');
    setNamaBarang('');
    setBeratKotor(0);
    setKeterangan('');
  };

  const formHandler = () => {
    const newBarang = {
      noBarang: dataBarang.length + 1,
      banyakColli,
      macamColli,
      merekColli,
      namaBarang,
      beratKotor,
      biayaAngkut: hitungBiayaAngkut(),
      keterangan,
    };

    setDataBarang([...dataBarang, newBarang]);
    resetState();

    handleClose();
  };

  return (
    <>
      <Button
        className='mb-2'
        variant='outline-primary'
        type='button'
        onClick={handleShow}
      >
        Tambah Barang
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Input Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId='banyakColli'>
              <Form.Label>Banyak Colli</Form.Label>

              <Form.Control
                type='number'
                value={banyakColli}
                onChange={(e) => setBanyakColli(e.target.value)}
                placeholder='Masukkan banyak colli'
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='macamColli'>
              <Form.Label>Macam Colli</Form.Label>

              {errorListBiaya && (
                <Message variant='danger'>{errorListBiaya}</Message>
              )}
              <Form.Control
                as='select'
                value={macamColli}
                onChange={(e) => setMacamColli(e.target.value)}
              >
                <option value='tes'>tes</option>
                {listBiaya &&
                  listBiaya.map((barang) => (
                    <option key={barang._id} value={barang.jenisBarang}>
                      {barang.jenisBarang}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='merekColli'>
              <Form.Label>Merek Colli</Form.Label>

              <Form.Control
                type='text'
                placeholder='Masukkan merek colli'
                value={merekColli}
                onChange={(e) => setMerekColli(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='namaBarang'>
              <Form.Label>Nama Barang</Form.Label>

              <Form.Control
                type='text'
                placeholder='Masukkan nama barang'
                value={namaBarang}
                onChange={(e) => setNamaBarang(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='beratKotor'>
              <Form.Label>Berat Kotor</Form.Label>

              <Form.Control
                type='number'
                placeholder='Masukkan berat kotor'
                value={beratKotor}
                onChange={(e) => setBeratKotor(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='biayaAngkut'>
              <Form.Label>Biaya Angkut</Form.Label>

              <Form.Control
                className='pl-3'
                plaintext
                readOnly
                type='text'
                value={`Rp. ${numeral(hitungBiayaAngkut()).format('0,0.00')}`}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='keterangan'>
              <Form.Label>Keterangan</Form.Label>

              <Form.Control
                type='text'
                placeholder='Masukkan keterangan'
                value={keterangan}
                onChange={(e) => setKeterangan(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={formHandler}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFormNota;
