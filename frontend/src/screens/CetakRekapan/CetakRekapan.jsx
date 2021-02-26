import React from 'react';
import { Row, Col, Table, Container } from 'react-bootstrap';

import styles from './CetakRekapan.module.scss';

const CetakNota = () => {
  return (
    <Container>
      <Row>
        <Col className='text-left'>
          <h1>JKTRANS</h1>
          <h3>Indonesia, Bali & Surabaya</h3>
          <p>WA: 081-234-567-890</p>
          <p>WA: 081-234-567-890</p>
        </Col>

        <Col className='text-right'>
          <h3>
            <strong>Nomor Rekapan:</strong> Kota Store
          </h3>
          <h3>
            <strong>Sopir:</strong> Kota Store
          </h3>
          <h3>
            <strong>Nomor Polisi:</strong> Kota Store
          </h3>
        </Col>
      </Row>

      <div className='dropdown-divider'></div>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No</th>
                <th>Banyak Colli</th>
                <th>Macam Colli</th>
                <th>Merek Colli</th>
                <th>Nama Barang</th>
                <th>Berat Kotor</th>
                <th>Biaya Angkut</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
              </tr>

              <tr>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
                <td>1234</td>
              </tr>
            </tbody>
          </Table>

          <div className='dropdown-divider'></div>
        </Col>
      </Row>

      <Row className='align-items-end'>
        <Col>
          <p>Tanga Tangan Sopir</p>

          <div className={styles.tandaTangan}>...................</div>
        </Col>
        <Col className='text-right'>
          <p>Denpasar, 20/9/2019</p>

          <div className={styles.tandaTangan}>...................</div>
        </Col>
      </Row>
    </Container>
  );
};

export default CetakNota;
