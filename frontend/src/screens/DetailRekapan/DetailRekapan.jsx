import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { Table, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';

import { selectRekapanById } from '../../redux/rekapan/rekapanListSlice.js';
import { COLUMN_NOTA } from './columns.js';

const DetailRekapan = ({ match, history }) => {
  const { rekapanId } = match.params;

  const dataRekapan = useSelector((state) =>
    selectRekapanById(state, rekapanId)
  );
  const { noRekapan, sopirPengirim, noPolis, detailRekapanNota } = dataRekapan;

  const notaColumns = useMemo(() => COLUMN_NOTA, []);
  const tableNota = useTable({
    columns: notaColumns,
    data: detailRekapanNota,
  });

  const goEditRekapanPage = () => {
    history.push(`/rekapan/${rekapanId}/edit`);
  };

  return (
    <>
      <Header />
      <Row noGutters>
        <Col className='p-4'>
          <div className='d-flex justify-content-between'>
            <h1 className='fs-xs-1-5'>Rekapan - {noRekapan}</h1>

            <Button
              type='button'
              variant='secondary'
              onClick={goEditRekapanPage}
            >
              <FontAwesomeIcon icon={faEdit} size='2x' />
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
                    value={sopirPengirim}
                    readOnly
                    required
                  />
                </Form.Group>

                <Form.Group controlId='nomorPolisi'>
                  <Form.Label>Nomor Polisi</Form.Label>

                  <Form.Control
                    type='text'
                    placeholder='Masukkan nama penerima'
                    value={noPolis}
                    readOnly
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          <h2 className='fs-xs-1-5'>Data Nota</h2>

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

export default DetailRekapan;
