import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

// import styles from './BuatNota.module.scss';

const LihatNota = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (false) {
      history.push('/');
    }
  }, [history]);

  return (
    <>
      <Header />

      <Row className='h-100' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatNota' />
        </Col>

        <Col className='p-4' md={9}>
          <h1>List Nota</h1>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Pengirim</th>
                <th>Nama Penerima</th>
                <th>Alamat Penerima</th>
                <th>Total Colli</th>
                <th>Total Berat</th>
                <th>Total Biaya</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Wayan</td>
                <td>nengah</td>
                <td>bangli</td>
                <td>12</td>
                <td>12 kg</td>
                <td>Rp. 99,999,999.00</td>
                <td>
                  <div className='d-flex'>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='mr-2 text-secondary'
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size='2x'
                      className='text-danger'
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td>2</td>
                <td>Wayan</td>
                <td>nengah</td>
                <td>bangli</td>
                <td>12</td>
                <td>12 kg</td>
                <td>Rp. 99,999,999.00</td>
                <td>
                  <div className='d-flex'>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='mr-2 text-secondary'
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size='2x'
                      className='text-danger'
                    />
                  </div>
                </td>
              </tr>

              <tr>
                <td>3</td>
                <td>Wayan</td>
                <td>nengah</td>
                <td>bangli</td>
                <td>12</td>
                <td>12 kg</td>
                <td>Rp. 99,999,999.00</td>
                <td>
                  <div className='d-flex'>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='mr-2 text-secondary'
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size='2x'
                      className='text-danger'
                    />
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

export default LihatNota;
