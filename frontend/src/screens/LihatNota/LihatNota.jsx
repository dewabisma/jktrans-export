import React, { useEffect, useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import TablePagination from '../../components/TablePagination/TablePagination';
import TableGlobalFilter from '../../components/TableGlobalFilter/TableGlobalFilter';

import {
  selectAllNota,
  deleteNotaById,
  selectNota,
  resetDeleteNotaState,
} from '../../redux/nota/notaListSlice.js';
import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { COLUMN_NOTA } from './columns.js';

const LihatNota = ({ history }) => {
  const dispatch = useDispatch();

  const dataNota = useSelector(selectNota);
  const { deleteStatus, deleteError, message } = dataNota;

  const authToken = useSelector(selectAuthToken);
  const listNota = useSelector(selectAllNota);

  const notaColumns = useMemo(() => COLUMN_NOTA, []);

  const tableNota = useTable(
    {
      columns: notaColumns,
      data: listNota,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    state: { globalFilter },
    setGlobalFilter,
  } = tableNota;

  const deleteNota = (notaId) => {
    dispatch(deleteNotaById(notaId));
  };

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (deleteStatus === 'success') {
      alert(message);

      dispatch(resetDeleteNotaState());
    }
  }, [history, authToken, dispatch, deleteStatus, message]);

  return (
    <>
      <Header />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatNota' />
        </Col>

        <Col className='p-4' md={9}>
          {deleteError && <Message variant='danger'>{deleteError}</Message>}

          <div className='d-flex justify-content-between'>
            <h1>List Nota</h1>

            <TableGlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>

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
              {tableNota.page.map((row) => {
                tableNota.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell', { deleteNota })}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <TablePagination tableProps={tableNota} />
        </Col>
      </Row>
    </>
  );
};

export default LihatNota;
