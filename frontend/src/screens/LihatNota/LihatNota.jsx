import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

import { selectAllNota } from '../../redux/nota/notaListSlice.js';

import { COLUMN_NOTA } from './columns.js';
import styles from './LihatNota.module.scss';

const LihatNota = ({ history }) => {
  const dispatch = useDispatch();

  const listNota = useSelector(selectAllNota);

  const notaColumns = useMemo(() => COLUMN_NOTA, []);

  const tableNota = useTable({
    columns: notaColumns,
    data: listNota,
  });

  useEffect(() => {
    if (false) {
      history.push('/');
    }
  }, [history]);

  return (
    <>
      <Header />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatNota' />
        </Col>

        <Col className='p-4' md={9}>
          <h1>List Nota</h1>

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

export default LihatNota;
