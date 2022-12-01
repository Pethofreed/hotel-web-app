
import { useSelector } from 'react-redux';
import { selectReservations } from '../../helpers/selectors';
import ReservationCard from '../ReservationCard';

const ViewReservations = () => {

  const { reservations = [] } = useSelector(selectReservations());

  return (
    reservations?.map((reservation) => (
      <ReservationCard data={reservation} />
    ))
  )
}

export default ViewReservations;
