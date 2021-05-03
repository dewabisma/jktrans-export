import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import numeral from 'numeral';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const COLUMN_NOTA = [
  {
    Header: 'No',
    Cell: ({ row }) => String(Number(row.index) + 1),
  },
  {
    Header: 'S.P.',
    accessor: 'nota.noNota',
  },
  {
    Header: 'Colli',
    accessor: 'colli',
  },
  {
    Header: 'Berat',
    accessor: 'berat',
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
        return 'Belum Dibayar';
      }
    },
  },
  {
    Header: 'Keterangan Pengiriman',
    accessor: 'isDelivered',
    Cell: ({ value, row, data }) => {
      if (value) {
        const index = row.index;
        const dateDelivered = parseISO(data[index].deliveredAt);
        const formatDate = format(dateDelivered, 'dd/MMM/yyyy');

        return `Diterima pada tanggal ${formatDate}`;
      } else {
        return 'Sedang Dikirim';
      }
    },
  },
];
