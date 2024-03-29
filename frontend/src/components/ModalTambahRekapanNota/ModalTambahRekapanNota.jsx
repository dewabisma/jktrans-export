import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'react-bootstrap';
import { selectAllNota } from '../../redux/nota/notaListSlice';

import Message from '../Message/Message';
import { COLUMN_NOTA } from './columns.js';
import styles from './ModalTambahRekapanNota.module.scss';

const ModalFormRekapan = ({ dataNota, setDataNota }) => {
  const listNota = useSelector(selectAllNota);
  const notaBelumRekap = listNota.filter((nota) => nota.sudahDirekap === false);

  const [show, setShow] = useState(false);
  const [kumpulanIdNota, setKumpulanIdNota] = useState([]);

  // React Table
  const notaColumns = useMemo(() => COLUMN_NOTA, []);
  const availableNota = useMemo(() => notaBelumRekap, [notaBelumRekap]);
  const tableNota = useTable({
    columns: notaColumns,
    data: availableNota,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isIdNotaAlreadyExist = (idNota) => {
    const isExist = kumpulanIdNota.find((id) => String(id) === String(idNota));

    if (isExist) {
      return true;
    } else {
      return false;
    }
  };
  const removeFromKumpulanIdNota = (idNota) => {
    const filtered = kumpulanIdNota.filter((id) => id !== idNota);

    setKumpulanIdNota(filtered);
  };
  const tambahKumpulanIdNota = (idNota) => {
    const isExist = isIdNotaAlreadyExist(idNota);

    if (isExist) {
      removeFromKumpulanIdNota(idNota);
    } else {
      setKumpulanIdNota([...kumpulanIdNota, idNota]);
    }
  };
  const tembahDataNota = () => {};
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
        className='px-2 ml-0'
      >
        <Modal.Header closeButton>
          <Modal.Title>Pilih Nota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            striped
            bordered
            hover
            responsive
            {...tableNota.getTableProps()}
          >
            <thead>
              {tableNota.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...tableNota.getTableBodyProps()}>
              {tableNota.rows.map((row) => {
                tableNota.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell', { tambahKumpulanIdNota })}
                      </td>
                    ))}
                  </tr>
                );
              })}
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
