import React from 'react';
import { Row, Col, Table, ListGroup } from 'react-bootstrap';

import Header from '../../components/Header/Header';

const DashboardScreen = () => {
  return (
    <>
      <Header />

      <Row noGutters>
        <Col className='bg-light pt-5' md={3}>
          <ListGroup defaultActiveKey='#link1' variant='flush'>
            <ListGroup.Item action href='#link1'>
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href='#link2' disabled>
              Link 2
            </ListGroup.Item>
            <ListGroup.Item action>This one is a button</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={9}>
          <Row className='p-4' noGutters>
            <Col xs={12} sm={3}>
              kotak
            </Col>
            <Col xs={12} sm={3}>
              kotak
            </Col>
            <Col xs={12} sm={3}>
              kotak
            </Col>
            <Col xs={12} sm={3}>
              kotak
            </Col>
          </Row>

          <Row className='p-4' noGutters>
            <Col>
              <Table responsive='xs'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className='p-4' noGutters>
            <Col>
              <Table responsive='xs'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                    <th>Table heading</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>

                  <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>

                  <tr>
                    <td>3</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default DashboardScreen;
