import React from 'react';
import { useDispatch } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';

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
    </>
  );
};

export default SideMenu;
