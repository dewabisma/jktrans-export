import React, { useState } from 'react';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

import Header from '../../components/Header/Header';
import ModalTambahRekapanNota from '../../components/ModalFormRekapan/ModalFormRekapan';

import styles from './EditRekapan.module.scss';

const EditRekapan = () => {
  const [dataNota, setDataNota] = useState([]);

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Rekapan - 12343</h1>

            <Button type='button' variant='primary'>
              <FontAwesomeIcon icon={faSave} size='2x' />

              <span className='font-weight-bold ml-2 d-none d-sm-inline'>
                Simpan
              </span>
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
                    required
                  />
                </Form.Group>

                <Form.Group controlId='nomorPolisi'>
                  <Form.Label>Nomor Polisi</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value='12D-h91'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <Row noGutters className='justify-content-between'>
            <h2 className='fs-xs-1-5'>Data Nota</h2>

            <ModalTambahRekapanNota
              dataNota={dataNota}
              setDataNota={setDataNota}
            />
          </Row>

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
                <th className='w-10'>Keterangan Pembayaran</th>
                <th className='w-10'>Keterangan Pengiriman</th>
                <th></th>
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

export default EditRekapan;
