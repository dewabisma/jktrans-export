import React, { useState, useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';
import { Table, Row, Col, Button, Form } from 'react-bootstrap';
import numeral from 'numeral';

import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { selectNotaById } from '../../redux/nota/notaListSlice';
import { COLUMN_BARANG } from './columns.js';

const DetailNota = ({ match, history }) => {
  const { notaId } = match.params;
  const dataNota = useSelector((state) => selectNotaById(state, notaId));
  const { noNota, namaPenerima, namaPengirim, alamatPenerima } = dataNota;

  const [dataBarang, setDataBarang] = useState(dataNota.detailBarang);

  const barangColumns = useMemo(() => COLUMN_BARANG, []);
  const tableBarang = useTable({
    columns: barangColumns,
    data: dataBarang,
  });

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
  const goEditNotaPage = () => {
    history.push(`/nota/${notaId}/edit`);
  };

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Nota - S.P. {noNota}</h1>

            <Button type='button' variant='secondary' onClick={goEditNotaPage}>
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
                    value={namaPengirim}
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='namaPenerima'>
                  <Form.Label>Nama Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value={namaPenerima}
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='alamatPenerima'>
                  <Form.Label>Alamat Penerima</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan alamat penerima'
                    value={alamatPenerima}
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

          <h2 className='fs-xs-1-5'>Data Barang</h2>

          <Table
            striped
            bordered
            hover
            responsive
            {...tableBarang.getTableProps()}
          >
            <thead>
              {tableBarang.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...tableBarang.getTableBodyProps()}>
              {tableBarang.rows.map((row) => {
                tableBarang.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default DetailNota;
