import React from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../../redux/user/userLoginSlice';
import { resetNotaState } from '../../redux/nota/notaListSlice';
import { resetRekapanState } from '../../redux/rekapan/rekapanListSlice';
import { resetBookinganState } from '../../redux/bookingan/bookinganListSlice';

const SideMenu = ({ history, page }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(resetNotaState());
    dispatch(resetRekapanState());
    dispatch(resetBookinganState());
    dispatch(logout());
  };

  return (
    <>
      <button
        className='btn btn-secondary d-inline-block d-sm-none'
        type='button'
        data-toggle='collapse'
        data-target='#collapseExample'
        aria-expanded='false'
        aria-controls='collapseExample'
      >
        <FontAwesomeIcon icon={faBars} size='2x' />
      </button>

      <div className='collapse' id='collapseExample'>
        <div className='card card-body border border-secondary'>
          <ListGroup variant='flush'>
            <ListGroup.Item
              variant='primary'
              action
              active={page === 'dashboard'}
              onClick={() => history.push('/dashboard')}
            >
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item
              variant='primary'
              action
              active={page === 'buatNota'}
              onClick={() => history.push('/nota/create')}
            >
              Buat Nota
            </ListGroup.Item>
            <ListGroup.Item
              variant='primary'
              action
              active={page === 'buatRekapan'}
              onClick={() => history.push('/rekapan/create')}
            >
              Buat Rekapan
            </ListGroup.Item>
            <ListGroup.Item
              variant='primary'
              action
              active={page === 'lihatNota'}
              onClick={() => history.push('/nota')}
            >
              Lihat Data Nota
            </ListGroup.Item>
            <ListGroup.Item
              variant='primary'
              action
              active={page === 'lihatRekapan'}
              onClick={() => history.push('/rekapan')}
            >
              Lihat Data Rekapan
            </ListGroup.Item>
          </ListGroup>

          <div className='d-flex justify-content-center mt-3'>
            <Button className='w-50' onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <ListGroup variant='flush' className='d-none d-sm-flex'>
        <ListGroup.Item
          variant='primary'
          action
          active={page === 'dashboard'}
          onClick={() => history.push('/dashboard')}
        >
          Dashboard
        </ListGroup.Item>
        <ListGroup.Item
          variant='primary'
          action
          active={page === 'buatNota'}
          onClick={() => history.push('/nota/create')}
        >
          Buat Nota
        </ListGroup.Item>
        <ListGroup.Item
          variant='primary'
          action
          active={page === 'buatRekapan'}
          onClick={() => history.push('/rekapan/create')}
        >
          Buat Rekapan
        </ListGroup.Item>
        <ListGroup.Item
          variant='primary'
          action
          active={page === 'lihatNota'}
          onClick={() => history.push('/nota')}
        >
          Lihat Data Nota
        </ListGroup.Item>
        <ListGroup.Item
          variant='primary'
          action
          active={page === 'lihatRekapan'}
          onClick={() => history.push('/rekapan')}
        >
          Lihat Data Rekapan
        </ListGroup.Item>
      </ListGroup>

      <div className='d-none d-sm-flex justify-content-center mt-3 '>
        <Button className='w-50' onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default SideMenu;
