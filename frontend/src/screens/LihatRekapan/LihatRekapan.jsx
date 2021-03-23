import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

import styles from './LihatRekapan.module.scss';

const LihatRekapan = ({ history }) => {
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
          <SideMenu history={history} page='lihatRekapan' />
        </Col>

        <Col className='p-4' md={9}>
          <h1>List Rekapan</h1>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className={styles.smallWidth}>No</th>
                <th>Sopir Pengirim</th>
                <th>No Polis</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=''>1</td>
                <td>Wayan</td>
                <td>1bddwai1</td>
                <td className='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button type='button' variant='secondary'>
                      Detail
                    </Button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='text-secondary'
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
                <td>1bddwai1</td>
                <td className='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button type='button' variant='secondary'>
                      Detail
                    </Button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='text-secondary'
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
                <td>1bddwai1</td>
                <td classname='w-25'>
                  <div className='d-flex justify-content-around'>
                    <Button type='button' variant='secondary'>
                      Detail
                    </Button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      size='2x'
                      className='text-secondary'
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

export default LihatRekapan;
