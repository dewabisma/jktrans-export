import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import SideMenu from '../../components/SideMenu/SideMenu';

// import styles from './BuatNota.module.scss';

import { logout } from '../../redux/user/userLoginSlice.js';

const BuatNota = ({ history }) => {
  const dispatch = useDispatch();

  return (
    <>
      <Header />

      <Row noGutters>
        <Col className='d-flex flex-column bg-light pt-3 pb-3' md={3}>
          <SideMenu history={history} page='buatNota' />
        </Col>

        <Col className='p-4' md={9}></Col>
      </Row>
    </>
  );
};

export default BuatNota;
