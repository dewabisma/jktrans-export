import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import styles from './LoginScreen.module.scss';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const LoginScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setLoadingFalse = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    setLoadingFalse();
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Row
      className={`justify-content-center align-items-center ${styles.inheritHeight}`}
      noGutters
    >
      <Col xs={12} sm={6} md={4}>
        <h1 className='text-center mb-3'>Jktrans</h1>

        <Form className='mx-3 mx-sm-0'>
          <Form.Group
            as={Row}
            controlId='formBasicEmail'
            className='m-0 mb-3 flex-column flex-sm-row'
          >
            <Form.Label column sm={4} className='px-0'>
              Email address
            </Form.Label>

            <Col sm={8} className='p-0'>
              <Form.Control type='email' placeholder='Enter email' />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId='formBasicPassword'
            className='m-0 mb-3 flex-column flex-sm-row'
          >
            <Form.Label column sm={4} className='px-0'>
              Password
            </Form.Label>

            <Col sm={8} className='p-0'>
              <Form.Control type='password' placeholder='Password' />
            </Col>
          </Form.Group>

          <div className='d-flex justify-content-center '>
            <Button variant='primary' type='submit'>
              Login
            </Button>

            <Button className='ml-2' variant='primary' type='submit'>
              Ginlo
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginScreen;
