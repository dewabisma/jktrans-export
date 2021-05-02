import numeral from 'numeral';
import { Form } from 'react-bootstrap';

export const COLUMN_NOTA = [
  {
    Header: 'No',
    Cell: ({ row }) => String(Number(row.index) + 1),
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
    accessor: 'totalBiaya',
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
    Header: 'Tambah Nota',
    accessor: '_id',
    Cell: ({ value, tambahIdNota }) => (
      <Form.Check
        type='checkbox'
        label='tambahkan'
        value='id-nota'
        id='id-nota'
        onChange={(e) => tambahIdNota(value)}
      />
    ),
  },
];
