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
    >
      <Col xs={12} sm={4}>
        <h1 className='text-center'>Jktrans</h1>

        <Form>
          <Form.Group as={Row} controlId='formBasicEmail'>
            <Form.Label column sm={4}>
              Email address
            </Form.Label>

            <Col sm={8}>
              <Form.Control type='email' placeholder='Enter email' />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='formBasicPassword'>
            <Form.Label column sm={4}>
              Password
            </Form.Label>

            <Col sm={8}>
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
