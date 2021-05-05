import React, { useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

import {
  selectAllRekapan,
  selectRekapan,
  deleteRekapanById,
  resetDeleteRekapanState,
} from '../../redux/rekapan/rekapanListSlice';
import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { COLUMN_REKAPAN } from './columns.js';
import styles from './LihatRekapan.module.scss';

const LihatRekapan = ({ history }) => {
  const dispatch = useDispatch();

  const dataRekapan = useSelector(selectRekapan);
  const { deleteStatus, deleteError, message } = dataRekapan;

  const authToken = useSelector(selectAuthToken);
  const listRekapan = useSelector(selectAllRekapan);
  const rekapanColumns = useMemo(() => COLUMN_REKAPAN, []);

  const tableRekapan = useTable({
    columns: rekapanColumns,
    data: listRekapan,
  });

  const deleteRekapan = (rekapanId) => {
    dispatch(deleteRekapanById(rekapanId));
  };

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (deleteStatus === 'success') {
      alert(message);

      dispatch(resetDeleteRekapanState());
    }
  }, [history, authToken, dispatch, message, deleteStatus]);

  return (
    <>
      <Header />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatRekapan' />
        </Col>

        <Col className='p-4' md={9}>
          {deleteError && <Message variant='danger'>{deleteError}</Message>}

          <h1>List Rekapan</h1>

          <Table
            striped
            bordered
            hover
            responsive
            {...tableRekapan.getTableProps()}
          >
            <thead>
              {tableRekapan.headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps([
                        {
                          className: column.className,
                        },
                      ])}
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...tableRekapan.getTableBodyProps()}>
              {tableRekapan.rows.map((row) => {
                tableRekapan.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell', { deleteRekapan })}
                      </td>
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

export default LihatRekapan;
