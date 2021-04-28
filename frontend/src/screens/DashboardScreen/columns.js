import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const COLUMN_NOTA = [
  {
    Header: 'Sp Nota',
    accessor: 'noNota',
  },
  {
    Header: 'Nama Pengirim',
    accessor: 'namaPengirim',
  },
  {
    Header: 'Alamat Tujuan',
    accessor: 'alamatPenerima',
  },
  {
    Header: 'Penginput',
    accessor: 'pegawai.username',
  },
  {
    Header: 'Action',
    accessor: '_id',
    Cell: ({ value }) => (
      <Link to={`/nota/${value}`}>
        <Button size='sm'>Check</Button>
      </Link>
    ),
  },
];

export const COLUMN_REKAPAN = [
  {
    Header: 'No Rekapan',
    accessor: 'noRekapan',
  },
  {
    Header: 'No Polis',
    accessor: 'noPolis',
  },
  {
    Header: 'Sopir',
    accessor: 'sopirPengirim',
  },
  {
    Header: 'Action',
    accessor: '_id',
    Cell: ({ value }) => (
      <Link to={`/rekapan/${value}`}>
        <Button size='sm'>Check</Button>
      </Link>
    ),
  },
];
