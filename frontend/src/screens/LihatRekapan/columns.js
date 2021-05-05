import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPrint } from '@fortawesome/free-solid-svg-icons';

export const COLUMN_REKAPAN = [
  {
    Header: 'No',
    accessor: 'noRekapan',
  },
  {
    Header: 'Sopir Pengirim',
    accessor: 'sopirPengirim',
  },
  {
    Header: 'No Polis',
    accessor: 'noPolis',
  },
  {
    Header: 'Actions',
    accessor: '_id',
    className: 'w-25',
    Cell: ({ value, deleteRekapan }) => (
      <div className='d-flex justify-content-around align-items-center'>
        <Link to={`/rekapan/${value}`}>
          <Button type='button' variant='secondary' className='px-2 py-1 mr-2'>
            Detail
          </Button>
        </Link>

        <Link to={`/rekapan/${value}/cetak`}>
          <Button variant='link' className='px-2 py-1'>
            <FontAwesomeIcon
              icon={faPrint}
              size='2x'
              aria-roledescription='clicking this element to print selected rekapan'
              className='text-secondary'
            />
          </Button>
        </Link>

        <Link to={`/rekapan/${value}/edit`}>
          <Button variant='link' className='px-2 py-1'>
            <FontAwesomeIcon
              icon={faEdit}
              size='2x'
              aria-roledescription='clicking this element to edit selected rekapan'
              className='text-secondary'
            />
          </Button>
        </Link>

        <Button
          variant='link'
          className='px-2 py-1'
          onClick={(e) => deleteRekapan(value)}
        >
          <FontAwesomeIcon
            icon={faTrashAlt}
            size='2x'
            aria-roledescription='clicking this element will delete selected rekapan'
            className='text-danger'
          />
        </Button>
      </div>
    ),
  },
];
