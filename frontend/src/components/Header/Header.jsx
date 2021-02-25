import React from 'react';
import {
  Navbar,
  NavDropdown,
  Nav,
  Row,
  Col,
  Container,
  Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header>
      <Navbar className={`px-4 ${styles.fullScreen}`} bg='light' expand='sm'>
        <LinkContainer to='/dashboard'>
          <Navbar.Brand>Jktrans</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <Row className='pl-5 w-100 justify-content-between align-items-center'>
            <Col className='align-center'>notification</Col>

            <Nav className='align-items-center'>
              <Image
                src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22171%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20171%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177d865962e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177d865962e%22%3E%3Crect%20width%3D%22171%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2260.8828125%22%20y%3D%2295.1%22%3E171x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
                alt='avatar'
                height='30px'
                width='40px'
                roundedCircle
              />

              <NavDropdown drop='left' title='Admin Bali' id='username'>
                <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>

                <NavDropdown.Item href='#action/3.2'>
                  Another action
                </NavDropdown.Item>

                <NavDropdown.Item href='#action/3.3'>
                  Something
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item href='#action/3.4'>
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Row>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
