
import { useSelector } from 'react-redux';
import { selectReservations } from '../../helpers/selectors';

const ViewReservations = () => {

  const { reservations = {} } = useSelector(selectReservations());

  return (
    <>
      <p>hola</p>
    </>
  )
}

export default ViewReservations;
