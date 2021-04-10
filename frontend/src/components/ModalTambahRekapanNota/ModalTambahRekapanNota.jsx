import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { selectAllNota } from '../../redux/nota/notaListSlice';
import numeral from 'numeral';

import Message from '../Message/Message';
import styles from './ModalTambahRekapanNota.module.scss';

const ModalFormRekapan = ({ dataNota, setDataNota }) => {
  const [show, setShow] = useState(false);

  const listNota = useSelector(selectAllNota);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const tambahNotaHandler = () => {};
  const buttonHandler = () => {
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
        Tambah Nota
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName={styles.modalDialogLebar}
        backdrop='static'
        keyboard={false}
        className='pl-0 ml-2'
      >
        <Modal.Header closeButton>
          <Modal.Title>Pilih Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No.</th>
                <th>Total Colli</th>
                <th>Total Berat</th>
                <th>Total Biaya</th>
                <th>Pengirim Barang</th>
                <th>Penerima Barang</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>123 Colli</td>
                <td>100 kg</td>
                <td>Rp. 9,999,999.00</td>
                <td>Wayan</td>
                <td>Ngurah</td>
                <td>
                  <Form.Check
                    type='checkbox'
                    label='tambahkan'
                    value='id-nota'
                    id='id-nota'
                    onChange={tambahNotaHandler}
                  />
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>123 Colli</td>
                <td>100 kg</td>
                <td>Rp. 9,999,999.00</td>
                <td>Wayan</td>
                <td>Ngurah</td>
                <td>
                  <Form.Check
                    type='checkbox'
                    label='tambahkan'
                    value='id-nota1'
                    id='id-nota1'
                    onChange={tambahNotaHandler}
                  />
                </td>
              </tr>

              <tr>
                <td>1</td>
                <td>123 Colli</td>
                <td>100 kg</td>
                <td>Rp. 9,999,999.00</td>
                <td>Wayan</td>
                <td>Ngurah</td>
                <td>
                  <Form.Check
                    type='checkbox'
                    label='tambahkan'
                    value='id-nota2'
                    id='id-nota2'
                    onChange={tambahNotaHandler}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={buttonHandler}>
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalFormRekapan;
