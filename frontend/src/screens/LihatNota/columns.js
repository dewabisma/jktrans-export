import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export const COLUMN_NOTA = [
  {
    Header: 'No',
    accessor: 'noNota',
  },
  {
    Header: 'Nama Pengirim',
    accessor: 'namaPengirim',
  },
  {
    Header: 'Nama Penerima',
    accessor: 'namaPenerima',
  },
  {
    Header: 'Alamat Penerima',
    accessor: 'alamatPenerima',
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
    Header: 'Actions',
    accessor: '_id',
    Cell: ({ value, deleteNota }) => (
      <div className='d-flex justify-content-around align-items-center'>
        <Link to={`/nota/${value}`}>
          <Button type='button' variant='secondary' className='px-2 py-1 mr-2'>
            Detail
          </Button>
        </Link>

        <Link to={`/nota/${value}/edit`}>
          <Button variant='link' className='px-2 py-1'>
            <FontAwesomeIcon
              icon={faEdit}
              size='2x'
              aria-roledescription='clicking this element to edit selected nota'
              className='text-secondary'
            />
          </Button>
        </Link>

        <Button variant='link' className='px-2 py-1'>
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
