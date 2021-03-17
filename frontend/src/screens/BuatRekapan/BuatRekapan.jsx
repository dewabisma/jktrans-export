import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Table } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

// import styles from './BuatRekapan.module.scss';

const BuatRekapan = ({ history }) => {
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
          <SideMenu history={history} page='buatRekapan' />
        </Col>

        <Col className='p-4' md={9}></Col>
      </Row>
    </>
  );
};

export default BuatRekapan;
