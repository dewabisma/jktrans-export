import React, { useState } from 'react';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';
import numeral from 'numeral';

import Header from '../../components/Header/Header';
import ModalFormNota from '../../components/ModalFormNota/ModalFormNota';

const EditNota = () => {
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
            <h1 className='fs-xs-1-5'>Nota - S.P. 12343</h1>

            <Button
              className='d-flex justify-content-between align-items-center'
              type='button'
              variant='primary'
            >
              <FontAwesomeIcon icon={faSave} size='2x' />
              <span className='font-weight-bold ml-2 d-none d-sm-inline'>
                Simpan
              </span>
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
                    required
                  />
                </Form.Group>

                <Form.Group controlId='namaPenerima'>
                  <Form.Label>Nama Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value='Wayan gede'
                    required
                  />
                </Form.Group>

                <Form.Group controlId='alamatPenerima'>
                  <Form.Label>Alamat Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan alamat penerima'
                    value='jalan brigjen ngurah rai'
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

          <Row noGutters className='justify-content-between'>
            <h2 className='fs-xs-1-5'>Data Barang</h2>
            <ModalFormNota
              dataBarang={dataBarang}
              setDataBarang={setDataBarang}
            />
          </Row>

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
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>12 colli</td>
                <td>Karung</td>
                <td>dunno</td>
                <td>Jamu</td>
                <td>123 kg</td>
                <td>Rp. 123,400.00</td>
                <td>siap dikirim</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        aria-roledescription='clicking this element to edit selected nota'
                        className='text-secondary'
                      />
                    </Button>

                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>12 colli</td>
                <td>Karung</td>
                <td>dunno</td>
                <td>Jamu</td>
                <td>123 kg</td>
                <td>Rp. 123,400.00</td>
                <td>siap dikirim</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        aria-roledescription='clicking this element to edit selected nota'
                        className='text-secondary'
                      />
                    </Button>

                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>12 colli</td>
                <td>Karung</td>
                <td>dunno</td>
                <td>Jamu</td>
                <td>123 kg</td>
                <td>Rp. 123,400.00</td>
                <td>siap dikirim</td>
                <td>
                  <div className='d-flex justify-content-around'>
                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faEdit}
                        size='2x'
                        aria-roledescription='clicking this element to edit selected nota'
                        className='text-secondary'
                      />
                    </Button>

                    <Button variant='link' className='px-2 py-1'>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        size='2x'
                        aria-roledescription='clicking this element will delete selected nota'
                        className='text-danger'
                      />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default EditNota;