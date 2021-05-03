import numeral from 'numeral';

export const COLUMN_BARANG = [
  {
    Header: 'No',
    Cell: ({ row }) => String(Number(row.index) + 1),
  },
  {
    Header: 'Banyak Colli',
    accessor: 'banyakColli',
    Cell: ({ value }) => `${value} Colli`,
  },
  {
    Header: 'Macam Colli',
    accessor: 'macamColli',
  },
  {
    Header: 'Merek Colli',
    accessor: 'merekColli',
  },
  {
    Header: 'Nama Barang',
    accessor: 'namaBarang',
  },
  {
    Header: 'Berat Kotor',
    accessor: 'beratKotor',
    Cell: ({ value }) => `${value} Kg`,
  },
  {
    Header: 'Biaya Angkut',
    accessor: 'biayaAngkut',
    Cell: ({ value }) => `Rp. ${numeral(value).format('0,0')}`,
  },
  {
    Header: 'Keterangan',
    accessor: 'keterangan',
  },
];
