
import { useSelector } from 'react-redux';
import { selectReservations } from '../../helpers/selectors';
import CircularProgress from '@mui/material/CircularProgress';
import ReservationCard from '../ReservationCard';

const ViewReservations = () => {

  const {
    reservations = [],
    startLoadingReservations
  } = useSelector(selectReservations());

  if (startLoadingReservations) return (
    <CircularProgress />
  );

  return (
    reservations?.map((reservation) => (
      <ReservationCard data={reservation} />
    ))
  )
}

export default ViewReservations;
