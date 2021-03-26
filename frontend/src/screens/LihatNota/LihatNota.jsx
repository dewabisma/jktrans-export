import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

import styles from './LihatNota.module.scss';

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

      <Row className='fullHeight' noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='lihatNota' />
        </Col>

        <Col className='p-4' md={9}>
          <h1>List Nota</h1>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className={styles.smallWidth}>No</th>
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
                <td>2</td>
                <td>Wayan</td>
                <td>budi</td>
                <td>garut99</td>
                <td>99 colli</td>
                <td>99kg</td>
                <td>Rp. 9,999,999.99</td>
                <td className='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button
                      type='button'
                      variant='secondary'
                      className='px-2 py-1'
                    >
                      Detail
                    </Button>

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
                <td>2</td>
                <td>Wayan</td>
                <td>budi</td>
                <td>garut99</td>
                <td>99 colli</td>
                <td>99kg</td>
                <td>Rp. 9,999,999.99</td>
                <td className='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button
                      type='button'
                      variant='secondary'
                      className='px-2 py-1'
                    >
                      Detail
                    </Button>

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
                <td>2</td>
                <td>Wayan</td>
                <td>budi</td>
                <td>garut99</td>
                <td>99 colli</td>
                <td>99kg</td>
                <td>Rp. 9,999,999.99</td>
                <td className='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button
                      type='button'
                      variant='secondary'
                      className='px-2 py-1'
                    >
                      Detail
                    </Button>

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

export default LihatNota;
