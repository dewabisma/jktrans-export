import numeral from 'numeral';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ModalFormEditBarang from '../../components/ModalFormEditBarang/ModalFormEditBarang';

export const COLUMN_BARANG = [
  {
    Header: 'No',
    accessor: 'noBarang',
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
    Cell: (props) => {
      console.log(props);
      return `${props.value} Kg`;
    },
  },
  {
    Header: 'Biaya Angkut',
    accessor: 'biayaAngkut',
    Cell: ({ value }) => `Rp. ${numeral(value).format('0,0.00')}`,
  },
  {
    Header: 'Keterangan',
    accessor: 'keterangan',
  },
  {
    Header: 'Actions',
    Cell: ({ value, row, dataBarang, setDataBarang, deleteBarang }) => (
      <div className='d-flex justify-content-around'>
        <ModalFormEditBarang
          indexBarang={row.index}
          dataBarang={dataBarang}
          setDataBarang={setDataBarang}
        />

        <Button
          variant='link'
          className='px-2 py-1'
          onClick={(e) => deleteBarang(row.index)}
        >
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
