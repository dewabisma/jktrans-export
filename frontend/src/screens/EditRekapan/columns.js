import numeral from 'numeral';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import ModalStatusNota from '../../components/ModalStatusNota/ModalStatusNota';

export const COLUMN_NOTA = [
  {
    Header: 'No',
    Cell: ({ row }) => String(Number(row.index) + 1),
  },
  {
    Header: 'S.P.',
    accessor: 'noNota',
  },
  {
    Header: 'Colli',
    accessor: 'colli',
    Cell: ({ value }) => `${value} Colli`,
  },
  {
    Header: 'Berat',
    accessor: 'berat',
    Cell: ({ value }) => `${value} Kg`,
  },
  {
    Header: 'Franco',
    accessor: 'franco',
    Cell: ({ value }) =>
      value ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faTimes} />
      ),
  },
  {
    Header: 'Confrankert',
    accessor: 'confrankert',
    Cell: ({ value }) => `Rp. ${numeral(value).format('0,0.00')}`,
  },
  {
    Header: 'Penerima',
    accessor: 'penerimaBarang',
  },
  {
    Header: 'Keterangan Pembayaran',
    accessor: 'isPaid',
    Cell: ({ value, row, data }) => {
      if (value) {
        const index = row.index;
        const datePaid = parseISO(data[index].paidAt);
        const formatDate = format(datePaid, 'dd/MMM/yyyy');

        return `Dibayar pada tanggal ${formatDate}`;
      } else {
        return 'Belum dibayar';
      }
    },
  },
  {
    Header: 'Keterangan Pengiriman',
    accessor: 'isDelivered',
    Cell: ({ value, row, data }) => {
      if (value) {
        const index = row.index;
        const deliveredDate = parseISO(data[index].deliveredAt);
        const formatDate = format(deliveredDate, 'dd/MMM/yyyy');

        return `Diterima pada tanggal ${formatDate}`;
      } else {
        return 'Sedang dikirim';
      }
    },
  },
  {
    Header: 'Actions',
    accessor: '_id',
    Cell: ({ row, deleteNota }) => (
      <div className='d-flex justify-content-around'>
        <ModalStatusNota />

        <Button variant='link' onClick={(e) => deleteNota(row.index)}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size='2x'
            aria-roledescription='clicking this element will delete selected nota'
            className='text-danger'
          />
        </Button>
      </div>
    ),
  },
];
