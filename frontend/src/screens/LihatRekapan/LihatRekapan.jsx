import React, { useState, useEffect, useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

import Header from '../../components/Header/Header';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';
import ModalLoadingPDF from '../../components/ModalLoadingPDF/ModalLoadingPDF';
import TablePagination from '../../components/TablePagination/TablePagination';
import TableGlobalFilter from '../../components/TableGlobalFilter/TableGlobalFilter';

import {
  selectAllRekapan,
  selectRekapan,
  deleteRekapanById,
  resetDeleteRekapanState,
} from '../../redux/rekapan/rekapanListSlice';
import { updateSudahRekapFalse } from '../../redux/nota/notaListSlice.js';
import { selectAuthToken } from '../../redux/user/userLoginSlice.js';
import { COLUMN_REKAPAN } from './columns.js';

const LihatRekapan = ({ history }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const dataRekapan = useSelector(selectRekapan);
  const { deleteStatus, deleteError, message, deletedNotaIds } = dataRekapan;

  const authToken = useSelector(selectAuthToken);
  const listRekapan = useSelector(selectAllRekapan);
  const rekapanColumns = useMemo(() => COLUMN_REKAPAN, []);

  const tableRekapan = useTable(
    {
      columns: rekapanColumns,
      data: listRekapan,
      initialState: { pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const {
    state: { globalFilter },
    setGlobalFilter,
  } = tableRekapan;

  const deleteRekapan = (rekapanId) => {
    dispatch(deleteRekapanById(rekapanId));
  };

  const getRekapanPDF = async (rekapanId) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      };

      const { data } = await axios.get(
        `/api/rekapan/${rekapanId}/print`,
        config
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const savePDF = async (rekapanId) => {
    setShow(true);
    const { filename } = await getRekapanPDF(rekapanId);

    if (filename) {
      setShow(false);
      window.open('http://localhost:5000/pdf/' + filename);
    }
  };

  useEffect(() => {
    if (!authToken) {
      history.replace('/');
    }

    if (deleteStatus === 'success') {
      alert(message);
      dispatch(updateSudahRekapFalse(deletedNotaIds));

      dispatch(resetDeleteRekapanState());
    }
  }, [history, authToken, dispatch, message, deleteStatus, deletedNotaIds]);

  return (
    <>
      <Header />

      <ModalLoadingPDF show={show} />

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatRekapan' />
        </Col>

        <Col className='p-4' md={9}>
          {deleteError && <Message variant='danger'>{deleteError}</Message>}

          <div className='d-flex justify-content-between'>
            <h1>List Rekapan</h1>

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
              {tableRekapan.page.map((row) => {
                tableRekapan.prepareRow(row);

                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>
                        {cell.render('Cell', { deleteRekapan, savePDF })}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <TablePagination tableProps={tableRekapan} />
        </Col>
      </Row>
    </>
  );
};

export default LihatRekapan;
