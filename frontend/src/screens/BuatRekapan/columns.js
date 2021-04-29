import numeral from 'numeral';
import { Form } from 'react-bootstrap';

export const COLUMN_NOTA = [
  {
    Header: 'No',
    accessor: 'noNota',
  },
  {
    Header: 'Total Colli',
    accessor: 'totalColli',
    Cell: ({ value }) => `${value} Colli`,
  },
  {
    Header: 'Total Berat',
    accessor: 'totalBerat',
    Cell: ({ value }) => `${value} Kg`,
  },
  {
    Header: 'Total Biaya',
    accessor: 'totalHarga',
    Cell: ({ value }) => `Rp. ${numeral(value).format('0,0.00')}`,
  },
  {
    Header: 'Pengirim Barang',
    accessor: 'namaPengirim',
  },
  {
    Header: 'Penerima Barang',
    accessor: 'namaPenerima',
  },
  {
    Header: 'Actions',
    accessor: '_id',
    Cell: ({ value, tambahNotaHandler }) => (
      <Form.Check
        type='checkbox'
        label='tambahkan'
        value={value}
        id={`nota-${value}`}
        onChange={tambahNotaHandler}
      />
    ),
  },
];
