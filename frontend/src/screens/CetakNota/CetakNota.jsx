import React from 'react';
import { Row, Col, Table, Container } from 'react-bootstrap';

const CetakNota = () => {
  return (
    <Container fluid>
      <Row className='align-items-end'>
        <Col className='text-left'>
          <h1>JKTRANS</h1>
          <h3>Indonesia, Bali & Surabaya</h3>
          <p>WA: 081-234-567-890</p>
          <p>WA: 081-234-567-890</p>
        </Col>

        <Col className='text-right'>
          <h3>
            <strong>Penerima:</strong> Kota Store
          </h3>
        </Col>
      </Row>

      <div className='dropdown-divider'></div>

      <Row className='align-items-end'>
        <Col>
          <h2>Data Pengirim</h2>
          <p>
            <strong>Nama:</strong> testing aja sih
          </p>
          <p className='text-muted'>Surabaya, Denpasar</p>
        </Col>
        <Col className='text-right'>
          <p>
            <strong>Tanggal:</strong> 2020-01-09
          </p>
          <p>
            <strong>No Nota:</strong> 1992
          </p>
        </Col>
      </Row>

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
    </Container>
  );
};

export default CetakNota;
