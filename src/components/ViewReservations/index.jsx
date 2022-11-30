import { useSelect } from "@mui/base";
import { selectReservations } from '../../helpers/selectors';

const ViewReservations = () => {

  const { reservations } = useSelect(selectReservations());

  return (
    <>
      <p>hola</p>
    </>
  )
}

export default ViewReservations;
