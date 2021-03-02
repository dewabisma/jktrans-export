import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import styles from './LoginScreen.module.scss';

import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Message from '../../components/Message/Message';
import axios from 'axios';

const LoginScreen = ({ history }) => {
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const body = {
        username,
        password,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/users/login', body, config);

      if (data) {
        localStorage.setItem('auth', JSON.stringify(data.authToken));

        history.push('/dashboard');
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      setLoginError(message);
    }
  };

  useEffect(() => {
    const setLoadingFalse = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

        {loginError && <Message variant='danger'>{loginError}</Message>}

        <Form className='mx-3 mx-sm-0' onSubmit={submitFormHandler}>
          <Form.Group
            as={Row}
            controlId='formBasicEmail'
            className='m-0 mb-3 flex-column flex-sm-row'
          >
            <Form.Label column sm={4} className='px-0'>
              Email address
            </Form.Label>

            <Col sm={8} className='p-0'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
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
              <Form.Control
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='true'
              />
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
